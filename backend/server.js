const express = require('express');
const cors = require('cors');
const { connectToDb} = require('./config/dbConfig');  

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
const bookingRoute = require('./routes/bookingRoute');
const paymentRoute = require('./routes/paymentRoute');
app.use(userRoute);
app.use('/api/rooms', roomRoute);
app.use(bookingRoute);
app.use(paymentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
