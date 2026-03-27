import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const api = import.meta.env.VITE_API_URL || 'https://fullstack-kryptonix.onrender.com/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [tags, setTags] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.append('category', filterCategory);
      if (filterPriority) params.append('priority', filterPriority);
      if (filterStatus) params.append('completed', filterStatus);
      if (searchTerm) params.append('search', searchTerm);

      const res = await axios.get(`${api}/tasks?${params}`);
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${api}/tasks/stats/summary`);
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filterCategory, filterPriority, filterStatus, searchTerm]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate || null,
      assignedTo: assignedTo.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      estimatedHours: estimatedHours ? parseFloat(estimatedHours) : 0,
    };

    try {
      const res = await axios.post(`${api}/tasks`, newTask);
      setTasks((prev) => [res.data, ...prev]);
      resetForm();
      setShowCreateForm(false);
      fetchStats();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!editingTask || !title.trim()) return;

    const updatedTask = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate || null,
      assignedTo: assignedTo.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      estimatedHours: estimatedHours ? parseFloat(estimatedHours) : 0,
    };

    try {
      const res = await axios.put(`${api}/tasks/${editingTask._id}`, updatedTask);
      setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? res.data : t)));
      resetForm();
      setEditingTask(null);
      setShowCreateForm(false);
      fetchStats();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('other');
    setPriority('medium');
    setDueDate('');
    setAssignedTo('');
    setTags('');
    setEstimatedHours('');
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setCategory(task.category || 'other');
    setPriority(task.priority || 'medium');
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    setAssignedTo(task.assignedTo || '');
    setTags(task.tags ? task.tags.join(', ') : '');
    setEstimatedHours(task.estimatedHours || '');
    setShowCreateForm(true);
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(`${api}/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
      fetchStats();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`${api}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      fetchStats();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const getCategoryColor = (cat) => {
    const colors = {
      feature: '#3b82f6',
      bug: '#ef4444',
      enhancement: '#10b981',
      documentation: '#8b5cf6',
      other: '#6b7280',
    };
    return colors[cat] || colors.other;
  };

  const getPriorityColor = (pri) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      urgent: '#dc2626',
    };
    return colors[pri] || colors.medium;
  };

  const isOverdue = (dueDate) => {
    return dueDate && new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="hero">
        <div className="hero-content">
          <h1>Kryptonix Studio Task Hub</h1>
          <p>Built for early-stage startups scaling engineering execution and team velocity.</p>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <section className="stats-dashboard">
        <div className="stat-card">
          <div className="stat-number">{stats.total || 0}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending || 0}</div>
          <div className="stat-label">Open Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed || 0}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completionRate || 0}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card urgent">
          <div className="stat-number">{stats.overdue || 0}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </section>

      <section className="controls-section">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
            <option value="enhancement">Enhancement</option>
            <option value="documentation">Documentation</option>
            <option value="other">Other</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="false">Open</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button
          className="create-btn"
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            if (!showCreateForm) {
              resetForm();
              setEditingTask(null);
            }
          }}
        >
          {showCreateForm ? 'Cancel' : '+ New Task'}
        </button>
      </section>

      {showCreateForm && (
        <form onSubmit={editingTask ? updateTask : addTask} className="task-form">
          <div className="form-grid">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows="3"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="feature">🚀 Feature</option>
              <option value="bug">🐛 Bug</option>
              <option value="enhancement">✨ Enhancement</option>
              <option value="documentation">📚 Documentation</option>
              <option value="other">📋 Other</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🟠 High</option>
              <option value="urgent">🔴 Urgent</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Due date"
            />
            <input
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Assigned to"
            />
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
            />
            <input
              type="number"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              placeholder="Estimated hours"
              min="0"
              step="0.5"
            />
          </div>
          <button type="submit" className="submit-btn">
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
      {loading ? (
        <div className="loading">Loading roadmap...</div>
      ) : (
        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks match your filters. Try adjusting your search criteria.</p>
          ) : (
            filteredTasks.map((task) => (
              <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                <div className="task-header">
                  <div className="task-meta">
                    <span
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(task.category) }}
                    >
                      {task.category}
                    </span>
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue-text' : ''}`}>
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="task-actions">
                    <button onClick={() => startEdit(task)} className="edit-btn">✏️</button>
                    <button onClick={() => toggleComplete(task)} className="complete-btn">
                      {task.completed ? '↩️' : '✅'}
                    </button>
                    <button onClick={() => removeTask(task._id)} className="delete-btn">🗑️</button>
                  </div>
                </div>

                <div className="task-content">
                  <h3 className={task.completed ? 'completed-text' : ''}>{task.title}</h3>
                  {task.description && <p className="task-description">{task.description}</p>}

                  <div className="task-details">
                    {task.assignedTo && <span className="assigned-to">👤 {task.assignedTo}</span>}
                    {task.estimatedHours > 0 && <span className="estimated-hours">⏱️ {task.estimatedHours}h</span>}
                    {task.tags && task.tags.length > 0 && (
                      <div className="tags">
                        {task.tags.map((tag, idx) => (
                          <span key={idx} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}

      <footer className="app-footer">
        Kryptonix Studio — MVP Workflow, powered by MERN
        <div className="footer-stats">
          Built with ❤️ for startup success
        </div>
      </footer>
    </div>
  );
}

export default App;
