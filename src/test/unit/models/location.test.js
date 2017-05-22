/* eslint-env mocha */

'use strict'

import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'
const mockgoose = new Mockgoose(mongoose)

import assert from 'assert'
import config from '~/config/config'
import Location from '~/app/models/location'

mongoose.Promise = global.Promise

describe('Location Model', () => {
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

  it('should save location success', async() => {
    let model = await new Location(createLocationWithKey('hash')).save()
    assert.equal(model.vehical, '1')
  })
})

let createLocationWithKey = (hash) => {
  return {
    type: 'GPRMC',
    date: new Date(),
    coord: {lng: 100.92753163, lat: 13.099856641666667},
    vehical: '1',
    hdop: null,
    hash: hash
  }
}
