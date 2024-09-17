import express from 'express';
import studentRoutes from './routes/student.routes.js';
import interviewRoutes from './routes/interview.routes.js';
import { connectToDB } from './config/db.js';
import cors from 'cors';

//  Initialize express app
const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors())

// Connect to MongoDB
connectToDB()

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/interviews', interviewRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
