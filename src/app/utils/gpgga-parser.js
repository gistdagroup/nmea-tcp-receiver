'use strict'

import * as nmea from '~/app/utils/nmea'
import moment from 'moment'

export const parse = (message) => {
  message = message.replace('\n', '')
  message = message.replace('\r', '')
  if (message === '') return null
  let result = {}
  let fields = message.split(',')

  result.messageId = fields[0]
  result.date = parseDate(fields[1])
  result.coord = {
    lng: nmea.toDecimal(parseDouble(fields[4]), fields[5]),
    lat: nmea.toDecimal(parseDouble(fields[2]), fields[3])
  }
  result.positionFixIndicator = parseDouble(fields[6])
  result.satellitesUsed = parseDouble(fields[7])
  result.hdop = parseDouble(fields[8])
  result.mslAltitude = parseDouble(fields[9])
  result.geoidSeparation = parseDouble(fields[11])
  result.checksum = fields[14]
  return result
}

export const parseDate = (time) => {
  let result = null
  if (time.length === 9) {
    try {
      let DD = moment().format('DD')
      let MM = moment().format('MM')
      let YYYY = moment().format('YYYY')

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
