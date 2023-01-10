export class ApiError extends Error {
  constructor (e: any) {
    let message = 'Something went wrong'
    if (e.response) {
      const MAP = {
        APP_ID_NOT_EXIST: 'Invalid APP ID',
        APP_ID_MISSING: 'Invalid APP ID',
        PARAMS_NOT_VALID: 'Invalid parameter found',
        BODY_NOT_VALID: 'Invalid data payload',
        RESOURCE_NOT_FOUND: 'The specified resource was not found',
        PATH_NOT_FOUND: 'The specified path was not found',
        SERVER_ERROR: 'Internal server error',
        OTHER: 'Something went wrong'
      }
      const t = e.response?.data?.error || 'OTHER'
      const type = (typeof t === 'string' ? t : 'OTHER') as keyof typeof MAP
      message = MAP[type] || MAP.OTHER
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (!window.navigator.onLine) {
        message = 'Check your internet connection'
      } else {
        message = 'Failed to load data from server'
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      message = 'Something went wrong'
    }
    super(message)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype)
    this.name = 'ApiError'
  }
}

export type ApiData = {
  data?: any
  meta?: any
}
