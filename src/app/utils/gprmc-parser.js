'use strict'

import * as nmea from '~/app/utils/nmea'

export const parse = (message) => {
  message = message.replace('\n', '')
  message = message.replace('\r', '')
  if (message === '') return null
  let result = {}
  let fields = message.split(',')

  result.messageId = fields[0]
  result.date = parseDate(fields[9], fields[1])
  result.status = fields[2]
  result.coord = {
    lng: nmea.toDecimal(parseDouble(fields[5]), fields[6]),
    lat: nmea.toDecimal(parseDouble(fields[3]), fields[4])
  }
  result.sog = parseDouble(fields[7])
  result.cog = parseDouble(fields[8])
  result.velocity = parseDouble(fields[10])
  result.mv = fields[11]
  result.checksum = fields[12]
  return result
}

export const parseDate = (date, time) => {
  let result = null
  if (date.length === 6 && time.length === 9) {
    try {
      let DD = parseInt(date.substring(0, 2))
      let MM = parseInt(date.substring(2, 4))
      let YYYY = 2000 + parseInt(date.substring(4, 6))

      let HH = parseInt(time.substring(0, 2))
      let mm = parseInt(time.substring(2, 4))
      let ss = parseInt(time.substring(4, 6))
      let SS = parseInt(time.substring(7, 9))
      result = new Date(Date.UTC(YYYY, MM, DD, HH, mm, ss, SS))
    } catch (e) {
      result = null
    }
  }
  return result
}

export const parseDouble = (string) => {
  let data = parseFloat(string)
  if (!isNaN(data)) {
    return data
  } else {
    return null
  }
}
