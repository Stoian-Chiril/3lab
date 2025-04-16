"use client";

import { useState } from "react";
import TaskList from '../components/TaskList';
import { createTask } from "@/lib/api";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    if (title && description) {
      // Создаем новую задачу
      await createTask({ title, description });
      setTitle(""); // Очищаем поля формы
      setDescription("");

      // Обновляем страницу с задачами
      window.location.reload(); // Перезагружаем страницу, чтобы отобразить добавленную задачу
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📋 Мои задачи</h1>

      <div className="space-y-2 mb-6">
        <input
          className="w-full border p-2 rounded"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Добавить задачу
        </button>
      </div>

      <TaskList />
    </main>
  );
}
