'use strict'

import * as parser from '~/app/utils/parser-factory'
import logger from '~/config/logger'
import Gpgga from '~/app/models/gpgga'
import Gprmc from '~/app/models/gprmc'
import Location from '~/app/models/location'
import Device from '~/app/models/device'
import Raw from '~/app/models/raw'
import ua from 'universal-analytics'
import * as utils from '~/app/utils/utils'
import moment from 'moment'

const visitor = ua('UA-97830439-1')

export const onReceive = (message, deviceId) => {
  let messages = message.toString('UTF-8')
  messages = messages.split('$')
  let datas = []
  for (let m of messages) {
    if (m) {
      let data = parser.parse(m)
      if (data) {
        logger.debug `push ${data}`
        data.deviceId = deviceId
        datas.push(data)
      }
    }
  }
  return datas
}

export const save = async(datas) => {
  let isSaveFirstLocation = null
  let promises = []
  for (let data of datas) {
    switch (data.messageId) {
      case parser.GPGGA:
        let saved = await saveGpgga(data, isSaveFirstLocation)
        promises = promises.concat(saved.promises)
        isSaveFirstLocation = saved.isSaveFirstLocation
        break
      case parser.GPRMC:
        promises = promises.concat(await saveGprmc(data))
        break
      default:
        promises.push(new Raw(data).save())
        break
    }
  }
  await Promise.all(promises)
}

let saveGpgga = async(data, isSaveFirstLocation) => {
  visitor.event('Location', 'Send', 'GPGGA', data.coord).send()

  let promises = []
  promises.push(new Gpgga(data).save())

  if (!isSaveFirstLocation) {
    let vehical = await getVehicalFromDeviceId(data.deviceId)
    let hash = utils.createLocationHash(data)
    let location = await Location.findOne({hash: hash})
    if (!location) {
      location = {type: parser.GPGGA, date: data.date, coord: data.coord, vehical: vehical, hdop: data.hdop, hash: hash}
      isSaveFirstLocation = true
      promises.push(new Location(location).save())
    }
  }
  return {promises: promises, isSaveFirstLocation: isSaveFirstLocation}
}

let saveGprmc = async(data) => {
  visitor.event('Location', 'Send', 'GPRMC', data.coord).send()

  let promises = []
  promises.push(new Gprmc(data).save())

  // let vehical = await getVehicalFromDeviceId(data.deviceId)
  // let location = {type: parser.GPRMC, date: data.date, coord: data.coord, vehical: vehical, hdop: null}
  // promises.push(new Location(location).save())
  return promises
}

let getVehicalFromDeviceId = async(deviceId) => {
  let vehical = null
  let device = await Device.findOne({name: deviceId})
  if (device) {
    vehical = device.vehical
  }
  return vehical
}
