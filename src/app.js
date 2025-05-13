require("dotenv").config();
const express = require("express");
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require('./routes/authRoutes');
const interestRoutes = require('./routes/interestRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const astrologyRoutes = require('./routes/astrologyRoutes');

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

app.use("/api", profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/astrology', astrologyRoutes);

module.exports = app;