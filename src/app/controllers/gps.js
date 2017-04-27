'use strict'

import * as parser from '~/app/utils/gnss-parser'
import Gps from '~/app/models/gnss'
import logger from '~/config/logger'

export const onReceive = (message) => {
  let messages = message.toString('UTF-8')
  messages = messages.split('$')
  let datas = []
  for (let m of messages) {
    if (m) {
      let data = parser.parse(m)
      if (data) {
        logger.debug `push  ${data}`
        datas.push(data)
      }
    }
  }
  return datas
}

export const save = async (datas) => {
  let promises = []
  for (let data of datas) {
    promises.push(new Gps(data).save())
  }
  await Promise.all(promises)
}
