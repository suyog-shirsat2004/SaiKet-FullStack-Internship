import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'
import './App.css'

function loadTasks() {
  try {
    const data = localStorage.getItem('todo-tasks-v2')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    localStorage.setItem('todo-tasks-v2', JSON.stringify(tasks))
    if (tasks.length > 0) {
      nextId = Math.max(...tasks.map((t) => t.id)) + 1
    }
  }, [tasks])

  function addTask({ title, description, priority, dueDate }) {
    setTasks([...tasks, {
      id: nextId++, title, description, priority, dueDate,
      completed: false, createdAt: Date.now(),
    }])
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function updateTask(id, data) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...data } : t)))
  }

  function deleteTask(id) {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== id))
    }
  }

  function clearCompleted() {
    const hasCompleted = tasks.some((t) => t.completed)
    if (hasCompleted && window.confirm('Delete all completed tasks?')) {
      setTasks(tasks.filter((t) => !t.completed))
    }
  }

  function duplicateTask(id) {
    const original = tasks.find((t) => t.id === id)
    if (original) {
      setTasks([...tasks, {
        ...original,
        id: nextId++,
        title: original.title + ' (copy)',
        completed: false,
        createdAt: Date.now(),
      }])
    }
  }

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt - a.createdAt
      if (sortBy === 'oldest') return a.createdAt - b.createdAt
      const order = { high: 0, medium: 1, low: 2 }
      return (order[a.priority] ?? 1) - (order[b.priority] ?? 1)
    })

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  const progress = tasks.length > 0 ? Math.round((counts.completed / tasks.length) * 100) : 0

  return (
    <div className="app-container">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-header bg-primary bg-gradient text-white border-0 p-4 text-center position-relative">
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
            style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}>
          </div>
          <h1 className="h3 mb-1 fw-bold">
            <span className="me-2">✨</span>Task Flow
          </h1>
          <p className="text-white-50 small mb-0">Stay organized, stay ahead</p>
        </div>

        <div className="card-body p-4">
          {tasks.length > 0 && (
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-muted fw-medium">
                  {counts.completed}/{counts.all} tasks done
                </small>
                <small className="text-muted fw-medium">{progress}%</small>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div
                  className="progress-bar bg-success bg-gradient rounded-pill"
                  role="progressbar"
                  style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          )}

          <TodoForm onAdd={addTask} />

          <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
            <TodoFilter filter={filter} onFilterChange={setFilter} counts={counts} />
            <div className="ms-auto d-flex align-items-center gap-1">
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>Sort:</small>
              <select
                className="form-select form-select-sm"
                style={{ width: 'auto', fontSize: '0.75rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-5">
              <div className="display-6 mb-3 opacity-50">
                {filter === 'all' ? '📝' : filter === 'active' ? '🎯' : '✅'}
              </div>
              <p className="text-muted mb-0">
                {filter === 'all'
                  ? 'No tasks yet. Add one above!'
                  : filter === 'active'
                  ? 'All tasks completed. Great job! 🎉'
                  : 'No completed tasks yet.'}
              </p>
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {filteredTasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onDuplicate={duplicateTask}
                />
              ))}
            </ul>
          )}

          {counts.completed > 0 && (
            <button
              className="btn btn-outline-danger btn-sm w-100 mt-3 rounded-pill"
              onClick={clearCompleted}
            >
              <span className="me-1">🗑️</span> Clear Completed ({counts.completed})
            </button>
          )}
        </div>

        <div className="card-footer bg-light border-0 p-3 text-center">
          <small className="text-muted">
            <span className="fw-medium text-dark">{counts.active}</span> active ·{' '}
            <span className="fw-medium text-dark">{counts.completed}</span> completed
            {tasks.length > 0 && (
              <> · <span className="fw-medium text-dark">{tasks.length}</span> total</>
            )}
          </small>
        </div>
      </div>
    </div>
  )
}
