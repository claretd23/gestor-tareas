import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/tasks', {
        name: taskName,
        description: taskDescription,
      });
      alert('Tarea creada');
    } catch (error) {
      alert('Error al crear tarea');
    }
  };

  return (
    <div>
      <h2>Crear Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la tarea:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear tarea</button>
      </form>
    </div>
  );
};

export default TaskForm;
