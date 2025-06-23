import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialForm = {
  title: '', description: '', status: 'Pending', priority: 'Medium', due_date: ''
};

const TaskForm = ({ fetchTasks, editingTask }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    }
  }, [editingTask]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${form.id}/`, form);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks/`, { ...form, user: 1 });
    }
    setForm(initialForm);
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option><option>In Progress</option><option>Completed</option>
      </select>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} required />
      <button type="submit">{form.id ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
