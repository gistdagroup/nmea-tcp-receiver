'use strict'

export const parse = (message) => {
  message = message.replace('\n', '')
  message = message.replace('\r', '')
  if (message === '') return null
  let result = {}
  result.raw = message
  return result
}
