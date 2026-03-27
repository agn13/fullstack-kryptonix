import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const api = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${api}/tasks`);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { title: title.trim() };
    try {
      const res = await axios.post(`${api}/tasks`, newTask);
      setTasks((prev) => [res.data, ...prev]);
      setTitle('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(`${api}/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`${api}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>Kryptonix Studio Task Hub</h1>
        <p>Built for early-stage startups scaling engineering execution and team velocity.</p>
      </header>

      <section className="startup-controls">
        <div className="kpi">
          <strong>{tasks.filter((t) => !t.completed).length}</strong>
          <span>Open tasks</span>
        </div>
        <div className="kpi">
          <strong>{tasks.filter((t) => t.completed).length}</strong>
          <span>Completed</span>
        </div>
      </section>

      <form onSubmit={addTask} className="task-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add sprint task, feature or bug fix"
          aria-label="Task name"
        />
        <button type="submit">Create Task</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading roadmap...</p>
      ) : (
        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Seed your first sprint item.</p>
          ) : (
            tasks.map((task) => (
              <li key={task._id} className={task.completed ? 'done' : ''}>
                <div className="task-text" onClick={() => toggleComplete(task)}>
                  <span>{task.title}</span>
                  <small>{task.completed ? 'Delivered' : 'In progress'}</small>
                </div>
                <button onClick={() => removeTask(task._id)}>Remove</button>
              </li>
            ))
          )}
        </ul>
      )}

      <footer className="app-footer">Kryptonix Studio — MVP Workflow, powered by MERN</footer>
    </div>
  );
}

export default App;
