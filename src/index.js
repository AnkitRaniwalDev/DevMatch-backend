import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import  signupRoute  from './routes/signup.route.js';
import bioRoute from './routes/bio.route.js';
import notificationRoute  from './routes/notification.route.js';
import chatRoute from './routes/chat.route.js';


dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'https://dev-match-frontend-three.vercel.app', // frontend ka URL
  credentials: true, // cookie bhejne ke liye
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
  allowHeaders: ['Content-Type', 'Authorization'], // allowed headers
  
}));

app.use(express.json());

app.use('/api', bioRoute);
app.use('/api', signupRoute);
app.use('/api', notificationRoute);
app.use('/api/chat', chatRoute);



// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error: ${error.message}`);
    process.exit(1); // error occurred, exit with failure
  }
};

connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server started on port ${PORT}`);
});