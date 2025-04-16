'use client';

import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';
import { fetchTasks, deleteTask } from '../lib/api';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    // Обновляем список задач после удаления
    getTasks();
  };

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onUpdate={getTasks} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;
