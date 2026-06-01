class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal Server Error'

  console.error(`[ERROR] ${status} - ${err.message}`)
  if (!err.isOperational) console.error(err.stack)

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = { AppError, errorHandler }
