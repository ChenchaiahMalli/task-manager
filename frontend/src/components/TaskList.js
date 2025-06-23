import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}/`);
      fetchTasks();
    }
  };

  return (
    <div>
      <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} />
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Status</th><th>Priority</th><th>Due</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} style={{ background: new Date(task.due_date) < new Date() ? '#fdd' : '' }}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.due_date}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
