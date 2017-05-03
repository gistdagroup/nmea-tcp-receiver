'use strict'

import * as gpgga from '~/app/utils/gpgga-parser'
import * as gprmc from '~/app/utils/gprmc-parser'
import * as raw from '~/app/utils/raw-parser'

const GPGGA = 'GPGGA'
const GPRMC = 'GPRMC'

export const parse = (message) => {
  message = message.replace('\n', '')
  message = message.replace('\r', '')
  if (message === '') return null

  let fields = message.split(',')
  switch (fields[0]) {
    case GPGGA: return gpgga.parse(message)
    case GPRMC: return gprmc.parse(message)
    default: return raw.parse(message)
  }
}
