/* eslint-env mocha */

'use strict'

import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'
const mockgoose = new Mockgoose(mongoose)

import assert from 'assert'
import config from '~/config/config'
import Device from '~/app/models/device'

mongoose.Promise = global.Promise

describe('Gpgga Model', () => {
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

  it('should save gpgga success', async() => {
    await new Device({name: 'device1', vehicle: 'vihecal 1'}).save()

    let count = await Device.count({})

    assert.equal(count, 1)
  })
})
