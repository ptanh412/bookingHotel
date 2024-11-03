const express = require('express');
const cors = require('cors');
const { connectToDb} = require('./config/dbConfig');  
const cronJobs = require('./cronJobs'); // Import cron jobs

const app = express();

app.use(cors());
app.use(express.json());

connectToDb();

const typeRoomRoute = require('./routes/typeRoomRoute');
const roomRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute');
const bookingRoute = require('./routes/bookingRoute');
const paymentRoute = require('./routes/paymentRoute');
const customerRoute = require('./routes/customerRoute');
app.use(userRoute);
app.use(typeRoomRoute);
app.use(roomRoute);
app.use(bookingRoute);
app.use(paymentRoute);
app.use(customerRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
