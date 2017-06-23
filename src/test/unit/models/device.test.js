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

  it('should save gpgga success', async() => {
    await new Device({name: 'device1', vehicle: 'vihecal 1'}).save()

    let count = await Device.count({})

    assert.equal(count, 1)
  })
})
