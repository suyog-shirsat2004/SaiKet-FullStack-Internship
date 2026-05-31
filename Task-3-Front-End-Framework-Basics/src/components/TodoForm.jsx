import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, description: description.trim(), priority, dueDate })
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-12">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">📌</span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-4">
          <select
            className="form-select form-select-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
        <div className="col-6 col-md-4">
          <input
            type="date"
            className="form-control form-control-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <button type="submit" className="btn btn-primary btn-sm w-100 fw-semibold">
            + Add Task
          </button>
        </div>
      </div>
    </form>
  )
}
