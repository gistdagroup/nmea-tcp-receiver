/* eslint-env mocha */

'use strict'

import * as nmea from '~/app/utils/nmea.js'
import assert from 'assert'

describe('nmea parser', () => {
  it('should parse 1340.7542 to decimal', () => {
    let expect = 13.6792377

    let actual = nmea.toDecimal(1340.7542)

    assert.equal(parseFloat(actual).toFixed(5), parseFloat(expect).toFixed(5))
  })

  it('should parse 1340.7542,N to decimal', () => {
    let expect = 13.6792377

    let actual = nmea.toDecimal(1340.7542, 'N')

    assert.equal(parseFloat(actual).toFixed(5), parseFloat(expect).toFixed(5))
  })

  it('should parse 1340.7542,S to decimal', () => {
    let expect = -13.6792377

    let actual = nmea.toDecimal(1340.7542, 'S')

    assert.equal(parseFloat(actual).toFixed(5), parseFloat(expect).toFixed(5))
  })

  it('should parse 10031.61802 to decimal', () => {
    let expect = 100.526967

    let actual = nmea.toDecimal(10031.61802)

    assert.equal(parseFloat(actual).toFixed(5), parseFloat(expect).toFixed(5))
  })

  it('should return null when parse null', () => {
    let expect = null

    let actual = nmea.toDecimal(null)

    assert.equal(actual, expect)
  })
})
