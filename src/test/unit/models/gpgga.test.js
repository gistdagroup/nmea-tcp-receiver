/* eslint-env mocha */

'use strict'

import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'
const mockgoose = new Mockgoose(mongoose)

import assert from 'assert'
import config from '~/config/config'
import Gpgga from '~/app/models/gpgga'

mongoose.Promise = global.Promise

describe('Gpgga Model', () => {
  before(function (done) {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect(config.db, function (err) {
        done(err)
      })
    })
  })

  afterEach((done) => {
    mockgoose.helper.reset().then(() => {
      done()
    })
  })

  it('should save gpgga success', async () => {
    let model = await new Gpgga({deviceId: 1,
      date: new Date(),
      coord: {lng: 1.0, lat: 1.0}
    }).save()
    assert(model.deviceId, 1)
  })
})
