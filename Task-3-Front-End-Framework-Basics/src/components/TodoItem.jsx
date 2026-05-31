import { useState } from 'react'

const priorityBadge = {
  high: ['danger', '🔴'],
  medium: ['warning text-dark', '🟡'],
  low: ['success', '🟢'],
}

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T23:59:59')
  const now = new Date()
  const diff = d - now
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return { text: `${Math.abs(days)}d overdue`, cls: 'text-danger fw-bold' }
  if (days === 0) return { text: 'Due today', cls: 'text-warning fw-bold' }
  if (days === 1) return { text: 'Due tomorrow', cls: 'text-info' }
  return { text: `Due in ${days}d`, cls: 'text-muted' }
}

export default function TodoItem({ task, onToggle, onUpdate, onDelete, onDuplicate }) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate ?? '')

  function handleSave() {
    const trimmed = editTitle.trim()
    if (!trimmed) return
    onUpdate(task.id, {
      title: trimmed,
      description: editDesc.trim(),
      priority: editPriority,
      dueDate: editDueDate,
    })
    setEditing(false)
  }

  function handleCancel() {
    setEditTitle(task.title)
    setEditDesc(task.description)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate ?? '')
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  const badge = priorityBadge[task.priority] ?? priorityBadge.medium

  if (editing) {
    return (
      <li className="list-group-item border rounded-3 p-3">
        <div className="d-flex flex-column gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Description"
          />
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              style={{ width: 'auto' }}
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <input
              type="date"
              className="form-control form-control-sm"
              style={{ width: 'auto' }}
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-success btn-sm" onClick={handleSave}>
              ✓ Save
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      </li>
    )
  }

  const due = formatDate(task.dueDate)

  return (
    <li
      className={`list-group-item border rounded-3 p-3 transition-shadow ${
        task.completed ? 'bg-light opacity-75' : 'bg-white'
      }`}
      style={{ transition: 'all 0.2s ease' }}
    >
      <div className="d-flex align-items-start gap-3">
        <div className="mt-1">
          <input
            type="checkbox"
            className="form-check-input"
            style={{ width: '1.2em', height: '1.2em', cursor: 'pointer' }}
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
        </div>
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span
              className={`fw-semibold ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
              style={{ fontSize: '0.95rem' }}
            >
              {task.title}
            </span>
            <span className={`badge bg-${badge[0]} rounded-pill`} style={{ fontSize: '0.65rem' }}>
              {badge[1]} {task.priority}
            </span>
            {due && <small className={due.cls} style={{ fontSize: '0.7rem' }}>{due.text}</small>}
          </div>
          {task.description && (
            <small className="text-muted d-block mt-1" style={{ fontSize: '0.8rem' }}>
              {task.description}
            </small>
          )}
          {task.createdAt && (
            <small className="text-muted opacity-50 d-block mt-1" style={{ fontSize: '0.65rem' }}>
              Added {new Date(task.createdAt).toLocaleDateString()}
            </small>
          )}
        </div>
        <div className="d-flex gap-1 flex-shrink-0">
          <button
            className="btn btn-outline-primary btn-sm"
            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
            onClick={() => setEditing(true)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="btn btn-outline-info btn-sm"
            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
            onClick={() => onDuplicate(task.id)}
            title="Duplicate"
          >
            🔄
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
            onClick={() => onDelete(task.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </li>
  )
}
