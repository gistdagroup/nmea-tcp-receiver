/* eslint-env mocha */

'use strict'

import * as controller from '~/app/controllers/gps'
import {RAW, GPGGA, GPRMC} from '~/app/utils/parser-factory'
import assert from 'assert'
import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'
const mockgoose = new Mockgoose(mongoose)
import config from '~/config/config'
import Gpgga from '~/app/models/gpgga'
import Gprmc from '~/app/models/gprmc'
import Location from '~/app/models/location'
mongoose.Promise = global.Promise

const messages = '$GPRMC,161139.40,A,1305.9913985,N,10055.6518978,E,0.11,352.96,250417,0.0,E,A*3E\r\n$GPGGA,161139.40,1305.9913985,N,10055.6518978,E,1,07,1.0,37.966,M,-29.453,M,527.4,*5C\r\n$GPGSA,A,3,05,12,13,15,19,20,,,,,,,5.4,2.2,4.9,1*29\r\n$GPGSV,2,1,06,05,63,336,38,12,46,250,43,13,40,161,38,15,19,198,37,1*6E\r\n$GPGSV,2,2,06,19,33,122,40,20,37,256,36,,,,,,,,,1*6D\r\n$GPRMC,161139.60,A,1305.9914310,N,10055.6519157,E,0.20,352.96,250417,0.0,E,A*3B\r\n$GPGGA,161139.60,1305.9914310,N,10055.6519157,E,1,07,1.0,38.215,M,-29.453,M,527.6,*59\r\n$GPGSA,A,3,05,12,13,15,19,20,,,,,,,5.4,2.2,4.9,1*29\r\n$GPGSV,2,1,06,05,63,336,38,12,46,250,43,13,40,161,38,15,19,198,37,1*6E\r\n$GPGSV,2,2,06,19,33,122,40,20,37,256,36,,,,,,,,,1*6D\r\n$GPRMC,161139.80,A,1305.9915284,N,10055.6519087,E,0.16,352.96,250417,0.0,E,A*31\r\n$GPGGA,161139.80,1305.9915284,N,10055.6519087,E,1,07,1.0,37.445,M,-29.453,M,527.8,*54\r\n$GPGSA,A,3,05,12,13,15,19,20,,,,,,,5.4,2.2,4.9,1*29\r\n$GPGSV,2,1,06,05,63,336,38,12,46,250,43,13,40,161,38,15,19,198,37,1*6E\r\n$GPGSV,2,2,06,19,33,122,40,20,37,256,36,,,,,,,,,1*6D\r\n$GPRMC,161140.00,A,1305.9914750,N,10055.6519325,E,0.36,352.96,250417,0.0,E,A*33\r\n$GPGGA,161140.00,1305.9914750,N,10055.6519325,E,1,07,1.0,37.876,M,-29.453,M,528.0,*5F\r\n$GPGSA,A,3,05,12,13,15,19,20,,,,,,,5.4,2.2,4.9,1*29\r\n$GPGSV,2,1,06,05,63,336,38,12,46,250,43,13,40,161,38,15,19,198,37,1*6E\r\n$GPGSV,2,2,06,19,33,122,40,20,37,256,36,,,,,,,,,1*6D\r\n'

const messages2 = 'A,1305.9913985,N,10055.6518978,E,0.11,352.96,250417,0.0,E,A*3E\r\n$GPGGA,161139.40,1305.9913985,N,10055.6518978,E,1,07,1.0,37.966,M,-29.453,M,527.4,*5C\r\n$GPGGA,A,3,'

const deviceId = '1'

const gprmcDataJson = [{
  messageId: 'GPRMC',
  date: new Date(),
  status: 'A',
  coord: {lng: 100.92753163, lat: 13.099856641666667},
  sog: 0.11,
  cog: 352.96,
  velocity: 0,
  mv: 'E',
  checksum: 'A*3E',
  deviceId: '1'
}]

const gpggaDataJson = [{
  messageId: 'GPGGA',
  date: new Date(),
  coord: {lng: 100.92753163, lat: 13.099856641666667},
  positionFixIndicator: 1,
  satellitesUsed: 7,
  hdop: 1,
  mslAltitude: 37.966,
  geoidSeparation: -29.453,
  checksum: '*5C',
  deviceId: '1'
}]

const multipleDataJson = [{
  messageId: 'GPGGA',
  date: new Date(),
  coord: {lng: 100.92753163, lat: 13.099856641666667},
  positionFixIndicator: 1,
  satellitesUsed: 7,
  hdop: 1,
  mslAltitude: 37.966,
  geoidSeparation: -29.453,
  checksum: '*5C',
  deviceId
}, {
  messageId: 'GPGGA',
  date: new Date(),
  coord: {lng: 100.92753163, lat: 13.099856641666667},
  positionFixIndicator: 1,
  satellitesUsed: 7,
  hdop: 1,
  mslAltitude: 37.966,
  geoidSeparation: -29.453,
  checksum: '*5C',
  deviceId
}, {
  messageId: 'GPRMC',
  date: new Date(),
  status: 'A',
  coord: {lng: 100.92753163, lat: 13.099856641666667},
  sog: 0.11,
  cog: 352.96,
  velocity: 0,
  mv: 'E',
  checksum: 'A*3E',
  deviceId: '1'
}]

describe('Gps controller', () => {
  before(async() => {
    await mockgoose.prepareStorage()
    await mongoose.connect(config.db)
  })

  after(async() => {
    await mongoose.connection.close()
  })

  afterEach(async() => {
    await mockgoose.helper.reset()
  })

  describe('On receive', () => {
    it('should parse messages 1', () => {
      let datas = controller.onReceive(messages, deviceId)

      assert.equal(datas[0].messageId, GPRMC)
      assert.equal(datas[0].deviceId, deviceId)
      assert.equal(datas[0].status, 'A')

      assert.equal(datas[1].messageId, GPGGA)
      assert.equal(datas[1].hdop, 1)

      assert.equal(datas[2].messageId, RAW)
      assert.equal(datas[2].deviceId, deviceId)
      assert.equal(datas[2].message, 'GPGSA,A,3,05,12,13,15,19,20,,,,,,,5.4,2.2,4.9,1*29')

      assert.equal(datas.length, 20)
    })

    it('should parse messages 2', () => {
      let datas = controller.onReceive(messages2, deviceId)
      assert.equal(datas.length, 2)
    })
  })

  describe('Save', () => {
    it('should save gprmc success', async() => {
      await controller.save(gprmcDataJson)

      let gprmcs = await Gprmc.find({})
      assert.equal(gprmcs.length, 1)
    })

    it('should not save gprmc as location success', async() => {
      await controller.save(gprmcDataJson)

      let count = await Location.count({})
      assert.equal(count, 0)
    })

    it('should save gpgga success', async() => {
      await controller.save(gpggaDataJson)

      let gpgga = await Gpgga.find({})
      assert.equal(gpgga.length, 1)
    })

    it('should save gpgga as location success', async() => {
      await controller.save(gpggaDataJson)

      let count = await Location.count({})
      assert.equal(count, 1)
    })

    it('should save only one location from full message success', async() => {
      await controller.save(multipleDataJson)

      let count = await Location.count({})
      assert.equal(count, 1)
    })
  })
})
