'use strict'
import { RAW } from '~/app/utils/parser-factory'
export const parse = (message) => {
  message = message.replace('\n', '')
  message = message.replace('\r', '')
  if (message === '') return null
  let result = {}
  result.messageId = RAW
  result.message = message
  return result
}
