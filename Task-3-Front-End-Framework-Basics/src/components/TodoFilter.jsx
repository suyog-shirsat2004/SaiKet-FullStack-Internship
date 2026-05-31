export default function TodoFilter({ filter, onFilterChange, counts }) {
  const filters = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'active', label: 'Active', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✅' },
  ]

  return (
    <div className="btn-group btn-group-sm" role="group">
      {filters.map(({ key, label, icon }) => (
        <button
          key={key}
          type="button"
          className={`btn ${filter === key ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => onFilterChange(key)}
        >
          {icon} {label}
          <span className={`badge ${filter === key ? 'bg-white text-primary' : 'bg-secondary'} ms-1`}
            style={{ fontSize: '0.6rem' }}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  )
}
