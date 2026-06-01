const { AppError } = require('./errorHandler')

function validateCreate(req, _res, next) {
  const { name, email, age } = req.body
  const errors = []

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required (min 2 characters)')
  }
  if (!email || typeof email !== 'string') {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format')
  }
  if (age === undefined || age === null) {
    errors.push('Age is required')
  } else if (typeof age !== 'number' || !Number.isInteger(age) || age < 1 || age > 150) {
    errors.push('Age must be an integer between 1 and 150')
  }

  if (errors.length) return next(new AppError(errors.join('; '), 400))
  next()
}

function validateUpdate(req, _res, next) {
  const { name, email, age } = req.body
  const errors = []

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be a string (min 2 characters)')
    }
  }
  if (email !== undefined) {
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email format')
    }
  }
  if (age !== undefined) {
    if (typeof age !== 'number' || !Number.isInteger(age) || age < 1 || age > 150) {
      errors.push('Age must be an integer between 1 and 150')
    }
  }

  if (errors.length) return next(new AppError(errors.join('; '), 400))
  next()
}

module.exports = { validateCreate, validateUpdate }
