const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const { connectDB } = require('./utils/db');
const { default: passengerRouter } = require('./routes/passenger.route');
const driverRouter = require('./routes/driver.route');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/passenger', passengerRouter);
app.use('/api/driver', driverRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: 'Something went wrong!' });
})

app.listen(process.env.PORT || 3000, async () => {
  await connectDB();
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});