const express = require('express')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { AppError } = require('../middleware/errorHandler')
const { validateCreate, validateUpdate } = require('../middleware/validate')

const router = express.Router()
const DATA_PATH = path.join(__dirname, '..', 'data', 'users.json')

function readUsers() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8')
}

// GET /api/users — List with pagination, search, sort, filter
router.get('/', (req, res) => {
  let users = readUsers()

  // Search by name or email (case-insensitive)
  const { search, sortBy, sortOrder, minAge, maxAge, page, limit } = req.query

  if (search) {
    const q = search.toLowerCase()
    users = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  }

  // Filter by age range
  if (minAge) users = users.filter((u) => u.age >= Number(minAge))
  if (maxAge) users = users.filter((u) => u.age <= Number(maxAge))

  // Sort
  const order = sortOrder === 'desc' ? -1 : 1
  if (sortBy === 'name') {
    users.sort((a, b) => order * a.name.localeCompare(b.name))
  } else if (sortBy === 'age') {
    users.sort((a, b) => order * (a.age - b.age))
  } else {
    users.sort((a, b) => order * (new Date(b.createdAt) - new Date(a.createdAt)))
  }

  // Pagination
  const pageNum = Math.max(1, Number(page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 10))
  const total = users.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (pageNum - 1) * pageSize
  const paginated = users.slice(start, start + pageSize)

  res.json({
    success: true,
    count: paginated.length,
    total,
    page: pageNum,
    totalPages,
    data: paginated,
  })
})

// GET /api/users/:id — Get single user
router.get('/:id', (req, res, next) => {
  const users = readUsers()
  const user = users.find((u) => u.id === req.params.id)
  if (!user) return next(new AppError('User not found', 404))
  res.json({ success: true, data: user })
})

// POST /api/users — Create user
router.post('/', validateCreate, (req, res, next) => {
  const users = readUsers()
  const { name, email, age } = req.body

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return next(new AppError('Email already exists', 409))
  }

  const user = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    age: Number(age),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  users.push(user)
  writeUsers(users)
  res.status(201).json({ success: true, data: user })
})

// PUT /api/users/:id — Full update
router.put('/:id', validateCreate, (req, res, next) => {
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === req.params.id)
  if (idx === -1) return next(new AppError('User not found', 404))

  const { name, email, age } = req.body
  const duplicate = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== req.params.id
  )
  if (duplicate) return next(new AppError('Email already exists', 409))

  users[idx] = {
    ...users[idx],
    name: name.trim(),
    email: email.trim().toLowerCase(),
    age: Number(age),
    updatedAt: new Date().toISOString(),
  }

  writeUsers(users)
  res.json({ success: true, data: users[idx] })
})

// PATCH /api/users/:id — Partial update
router.patch('/:id', validateUpdate, (req, res, next) => {
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === req.params.id)
  if (idx === -1) return next(new AppError('User not found', 404))

  const { name, email, age } = req.body

  if (email) {
    const duplicate = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== req.params.id
    )
    if (duplicate) return next(new AppError('Email already exists', 409))
  }

  if (name !== undefined) users[idx].name = name.trim()
  if (email !== undefined) users[idx].email = email.trim().toLowerCase()
  if (age !== undefined) users[idx].age = Number(age)
  users[idx].updatedAt = new Date().toISOString()

  writeUsers(users)
  res.json({ success: true, data: users[idx] })
})

// DELETE /api/users/:id — Delete single user
router.delete('/:id', (req, res, next) => {
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === req.params.id)
  if (idx === -1) return next(new AppError('User not found', 404))

  const deleted = users.splice(idx, 1)
  writeUsers(users)
  res.json({ success: true, data: deleted[0] })
})

// DELETE /api/users — Bulk delete all users (query param `confirm=true`)
router.delete('/', (req, res) => {
  if (req.query.confirm !== 'true') {
    throw new AppError('Add ?confirm=true to delete all users', 400)
  }
  writeUsers([])
  res.json({ success: true, message: 'All users deleted' })
})

module.exports = router
