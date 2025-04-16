import { Task } from '@/types/task';
import React, { useState } from 'react';
import { updateTask } from '../lib/api';

const TaskItem = ({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: () => void;
  onDelete: (id: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleSave = async () => {
    await updateTask(editedTask);
    setIsEditing(false);
    onUpdate();
  };

  const toggleCompleted = async () => {
    await updateTask({ ...task, is_completed: !task.is_completed });
    onUpdate();
  };

  return (
    <div className="p-4 border rounded-md shadow mb-4">
      {isEditing ? (
        <>
          <input
            className="border p-1 w-full mb-2"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            className="border p-1 w-full mb-2"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
            Сохранить
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded">
            Отмена
          </button>
        </>
      ) : (
        <>
          <h3 className={`text-xl font-bold ${task.is_completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
          <p className="mb-2">{task.description}</p>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-2 py-1 rounded">
              Редактировать
            </button>
            <button onClick={toggleCompleted} className={`px-2 py-1 rounded ${task.is_completed ? 'bg-green-600' : 'bg-gray-500'} text-white`}>
              {task.is_completed ? '✔ Выполнено' : 'Отметить как выполнено'}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
