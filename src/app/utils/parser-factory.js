'use strict'

import * as gpgga from '~/app/utils/gpgga-parser'
import * as gprmc from '~/app/utils/gprmc-parser'
import * as raw from '~/app/utils/raw-parser'

export const GPGGA = 'GPGGA'
export const GPRMC = 'GPRMC'

export const GPGSV = 'GPGSV'
export const GPGSA = 'GPGSA'
export const RAW = 'RAW'

export const parse = (message) => {
  message = message.replace(/\\?\\n/g, '')
  message = message.replace(/\\?\\r/g, '')
  if (message === '') return null

  let fields = message.split(',')
  switch (fields[0]) {
    case GPGGA: return gpgga.parse(message)
    case GPRMC: return gprmc.parse(message)
    case GPGSV:
    case GPGSA: return raw.parse(message)
    default: return null
  }
}
