import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/tasks/create" element={<TaskForm />} />
      </Routes>

      </div>
    </Router>
  );
};

export default App;
