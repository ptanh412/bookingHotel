const express = require('express');
const cors = require('cors');
const { connectToDb, sql } = require('./config/dbConfig');  

const app = express();

app.use(cors());
app.use(express.json());

connectToDb();

// app.get('/api/users', async (req, res) => {
//     try {
//       const result = await sql.query`SELECT * FROM users`;  
//       res.json(result.recordset);  
//     } catch (error) {
//       console.error('Error fetching data:', error);  
//       res.status(500).send('Error fetching data');
//     }
//   });
const roomRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute');

app.use('/api/users', userRoute);
app.use('/api/rooms', roomRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
