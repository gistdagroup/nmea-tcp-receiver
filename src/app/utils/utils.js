'use strict'

import moment from 'moment'

export const createLocationHash = (data) => {
  return data.deviceId + '-' + moment(data.date).format();
}