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
  before((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(config.db)
      done()
    })
  })

  after((done) => {
    mongoose.connection.close().then(() => {
      done()
    })
  })

  afterEach((done) => {
    mockgoose.helper.reset().then(() => {
      done()
    })
  })

  it('should save location success', async() => {
    let model = await new Location(createLocationWithKey('hash')).save()
    assert.equal(model.vehicle, '1')
  })
})

let createLocationWithKey = (hash) => {
  return {
    type: 'GPRMC',
    date: new Date(),
    coord: {lng: 100.92753163, lat: 13.099856641666667},
    vehicle: '1',
    hdop: null,
    hash: hash
  }
}
