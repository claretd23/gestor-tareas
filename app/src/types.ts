// src/types.ts

export interface Task {
    id: number;           // ID único de la tarea
    name: string;         // Nombre de la tarea
    description: string;  // Descripción de la tarea
    completed: boolean;   // Estado de la tarea (completada o no)
  }
