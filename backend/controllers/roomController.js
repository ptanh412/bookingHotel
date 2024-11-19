const { sql } = require('../config/dbConfig');

const getRooms = async (req, res) => {
  try {
    const result = await sql.query(`
          SELECT r.*, 
              type_room.name AS type_name,
              STRING_AGG(amenities.name, ', ') AS amenities_list
              FROM rooms r
              JOIN type_room ON r.type_room_id = type_room.id
              LEFT JOIN room_amenities ON r.id = room_amenities.room_id
              LEFT JOIN amenities ON room_amenities.amenity_id = amenities.id
              GROUP BY r.id, type_room.name,
                  r.type_room_id,
                  r.name,
                  r.capacity,
                  r.acreage,
                  r.amount_bed,
                  r.price,
                  r.image,
                  r.status;
      `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};

const getRoomById = async (req, res) => {
  try {
    const result = await sql.query(`SELECT r.*, 
                            type_room.name AS type_name,
                            STRING_AGG(amenities.name, ', ') AS amenities_list
                            FROM rooms r
                            JOIN type_room ON r.type_room_id = type_room.id
                            LEFT JOIN room_amenities ON r.id = room_amenities.room_id
                            LEFT JOIN amenities ON room_amenities.amenity_id = amenities.id
                            WHERE r.id = ${req.params.id}
                            GROUP BY r.id, 
                                    type_room.name,
                                    r.type_room_id,
                                    r.name,
                                    r.capacity,
                                    r.acreage,
                                    r.amount_bed,
                                    r.price,
                                    r.image,
                                    r.status; `
    );
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}
const getIdRoom = async (req, res) => {
  try {
    const result = await sql.query(`SELECT * FROM rooms WHERE id = ${req.params.id}`);
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}
const searchRooms = async (req, res) => {
  try {
    const { checkIn, checkOut, typeRoom, amountOfPeople, price } = req.body.params;

    // Validate date inputs
    if (!checkIn || !checkOut) {
      return res.status(400).json({ error: 'Check-in and check-out dates are required' });
    }

    // Improved date formatting function with validation
    const formatDate = (dateStr) => {
      // Check if the date string is valid
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) {
        throw new Error('Invalid date format');
      }
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Validate dates before processing
    let formattedCheckIn, formattedCheckOut;
    try {
      formattedCheckIn = formatDate(checkIn);
      formattedCheckOut = formatDate(checkOut);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid date format provided' });
    }

    const query = `
          SELECT r.*, 
                type_room.name AS type_name, 
                STRING_AGG(amenities.name, ', ') AS amenities_list
          FROM rooms r
          JOIN type_room ON r.type_room_id = type_room.id
          LEFT JOIN room_amenities ON r.id = room_amenities.room_id
          LEFT JOIN amenities ON room_amenities.amenity_id = amenities.id
          WHERE r.capacity >= @amountOfPeople
          AND r.price <= @price
          AND (@typeRoom IS NULL OR r.type_room_id = @typeRoom)
          AND r.id NOT IN (
            SELECT bookings.room_id 
            FROM bookings 
            WHERE bookings.check_in <= @checkOut 
            AND bookings.check_out >= @checkIn
          )
          GROUP BY r.id, type_room.name, r.type_room_id, r.name, 
                  r.capacity, r.acreage, r.amount_bed, r.price, 
                  r.image, r.status
        `;

    const request = new sql.Request();
    
    // Use the validated and formatted dates
    request.input('checkIn', sql.Date, formattedCheckIn);
    request.input('checkOut', sql.Date, formattedCheckOut);

    // Validate and parse numeric inputs
    request.input('typeRoom', sql.Int, typeRoom ? parseInt(typeRoom) : null);
    request.input('amountOfPeople', sql.Int, parseInt(amountOfPeople) || 0);
    request.input('price', sql.Int, parseInt(price) || 0);

    const result = await request.query(query);
    res.json(result.recordset);

  } catch (error) {
    console.error('Error fetching data:', error);
    // Send more specific error message
    res.status(500).json({ 
      error: 'Error fetching data', 
      details: error.message 
    });
  }
};


module.exports = { getRooms, getRoomById, getIdRoom, searchRooms };