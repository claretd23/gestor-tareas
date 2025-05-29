import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
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

export default TaskList;
