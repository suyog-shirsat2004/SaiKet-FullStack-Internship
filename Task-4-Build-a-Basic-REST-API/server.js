const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const { errorHandler } = require('./middleware/errorHandler')
const userRoutes = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '1mb' }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', userRoutes)

app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'Task 4 REST API',
    version: '1.0.0',
    endpoints: {
      'GET    /api/users': 'List users (supports ?search, ?sortBy, ?sortOrder, ?minAge, ?maxAge, ?page, ?limit)',
      'GET    /api/users/:id': 'Get a single user by ID',
      'POST   /api/users': 'Create a user (name, email, age)',
      'PUT    /api/users/:id': 'Full update a user',
      'PATCH  /api/users/:id': 'Partial update a user',
      'DELETE /api/users/:id': 'Delete a user',
      'DELETE /api/users?confirm=true': 'Delete all users',
    },
  })
})

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`\n  Task 4 REST API running at:`)
  console.log(`  ➜  http://localhost:${PORT}`)
  console.log(`  ➜  http://localhost:${PORT}/api`)
  console.log(`  ➜  http://localhost:${PORT}/api/users\n`)
})
