import express, { Request, Response, Router } from 'express';
import { Pool } from 'pg';

const router: Router = express.Router();

// Настройка подключения к базе
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



// Define Task interface for better type safety
interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

// Получить все задачи
router.get('/', async (_req: Request, res: Response): Promise<any> => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Получить задачу по ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Создать новую задачу
router.post('/', async (req: Request<{}, {}, Task>, res: Response): Promise<any> => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Обновить задачу
router.put('/:id', async (req: Request<{ id: string }, {}, Task>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, is_completed = $3
       WHERE id = $4
       RETURNING *`,
      [title, description, is_completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Удалить задачу
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    return res.json({ message: 'Задача удалена' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;