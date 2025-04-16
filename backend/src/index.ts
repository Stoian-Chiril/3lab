import express from 'express';
import dotenv from 'dotenv';
import tasksRoutes from './routes/tasks';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONT_API, // Разрешаем запросы от фронта
}));

app.use(express.json());
app.use('/tasks', tasksRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
