import { Task } from "@/types/task";

const API_BASE = String(process.env.BACK_API);

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(task: Task): Promise<Task> {
    const response = await fetch(`${API_BASE}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  
    if (!response.ok) {
      throw new Error('Ошибка при обновлении задачи');
    }
  
    return response.json();
  }
  

export async function deleteTask(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
