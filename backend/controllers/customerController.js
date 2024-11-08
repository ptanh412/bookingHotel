const { sql } = require('../config/dbConfig');
const createOrUpdateCustomer = async (req, res) => {
    try {
        const { user_id, fullName, phone, idCard, sex, is_primary, bookingId, existingCustomerId } = req.body;

        let customerId;

        // Nếu có existingCustomerId, nghĩa là đang sử dụng khách hàng hiện có
        if (existingCustomerId) {
            customerId = existingCustomerId;

            // Cập nhật thông tin khách hàng hiện có
            await sql.query`
                UPDATE customers
                SET fullName = ${fullName}, phoneNumber = ${phone}, idCard = ${idCard}, sex = ${sex}, is_primary = ${is_primary}
                WHERE id = ${customerId}
            `;
            await sql.query`
                UPDATE bookings
                SET customer_id = ${customerId}
                WHERE id = ${bookingId} AND user_id = ${user_id}`;
            return res.json({ message: 'Customer updated successfully', customerId });
        } else {
            // Kiểm tra khách hàng chính đã tồn tại nếu là khách hàng mới
            if (is_primary === 1) {
                const existingCustomerResult = await sql.query`
                    SELECT * FROM customers WHERE idCard = ${idCard} AND is_primary = 1
                `;

                if (existingCustomerResult.recordset.length > 0) {
                    return res.status(400).json({
                        message: 'Primary customer already exists with this ID Card.'
                    });
                }
            }

            // Tạo mã id mới cho khách hàng
            const lastIdResult = await sql.query`
                SELECT TOP 1 id FROM customers ORDER BY id DESC
            `;

            if (lastIdResult.recordset.length > 0) {
                const lastId = lastIdResult.recordset[0].id;
                const lastNumber = parseInt(lastId.replace('Cust', ''), 10);
                customerId = `Cust${(lastNumber + 1).toString().padStart(2, '0')}`;
            } else {
                customerId = 'Cust01';
            }

            // Thêm khách hàng mới
            await sql.query`
                INSERT INTO customers (id, user_id, fullName, phoneNumber, idCard, sex, is_primary)
                VALUES (${customerId}, ${user_id}, ${fullName}, ${phone}, ${idCard}, ${sex}, ${is_primary})
            `;
        }

        // Cập nhật customer_id trong booking
        await sql.query`
            UPDATE bookings
            SET customer_id = ${customerId}
            WHERE id = ${bookingId} AND user_id = ${user_id}
        `;

        res.json({
            message: existingCustomerId ? 'Booking updated successfully' : 'Customer created successfully',
            customerId: customerId
        });
    } catch (error) {
        console.error('Error in createOrUpdateCustomer:', error); // Log lỗi để dễ dàng tìm nguyên nhân
        res.status(500).json({ message: "Failed to process customer information" });
    }
};


const getCustByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await sql.query`
            SELECT * FROM customers WHERE user_id = ${userId}
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
};
const getCustByPrimary = async (req, res) => {
    try {
        const userId = req.query.userId;
        const isPrimary = req.query.is_primary;

        // Validate input parameters
        if (!userId || userId === 'undefined') {
            return res.status(400).json({ message: 'Valid user ID is required' });
        }

        if (!isPrimary || isPrimary === 'undefined') {
            return res.status(400).json({ message: 'Valid is_primary parameter is required' });
        }

        // Convert parameters to appropriate types
        const userIdInt = parseInt(userId, 10);
        const isPrimaryInt = parseInt(isPrimary, 10);

        if (isNaN(userIdInt) || isNaN(isPrimaryInt)) {
            return res.status(400).json({ message: 'Invalid parameter types' });
        }

        const result = await sql.query`
            SELECT * FROM customers 
            WHERE user_id = ${userIdInt} 
            AND is_primary = ${isPrimaryInt}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({
            message: 'Error fetching customer data',
            error: error.message
        });
    }
};
const getALlCustomer = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM customers
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
};  
module.exports = { createOrUpdateCustomer, getCustByUserId, getCustByPrimary,getALlCustomer };