import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.mjs';
import taskRoutes from './src/routes/taskRoutes.mjs';
dotenv.config();
connectDB();
// Initialize Express app
const app = express();

const corsOptions = {
  origin: ['https://task-manager-frontend-6b94.vercel.app'], // Add both frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
// Parse incoming JSON requests
app.use(express.json());
// Task routes
app.use('/tasks', taskRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
