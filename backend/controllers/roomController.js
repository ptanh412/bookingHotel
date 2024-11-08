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
module.exports = { getRooms, getRoomById };