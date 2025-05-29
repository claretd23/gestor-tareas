import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { Task } from '../types';  // Importa el tipo Task

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);  // Establece el estado como una lista de tareas

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        alert('Error al obtener las tareas');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Tareas</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.name}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
