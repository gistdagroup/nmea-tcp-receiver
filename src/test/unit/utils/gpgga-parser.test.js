/* eslint-env mocha */

'use strict'

import * as parser from '~/app/utils/gpgga-parser.js'
import assert from 'assert'
import moment from 'moment'
const message = 'GPGGA,161141.80,1305.9916484,N,10055.6519296,E,1,07,1.0,36.078,M,-29.453,M,529.8,*59'

describe('GPGGA-parser', () => {
  describe('parse message Id', () => {
    it('should get message id from message', () => {
      let expected = 'GPGGA'

      let data = parser.parse(message)
      let actual = data.messageId

      assert.equal(actual, expected)
    })
  })

  describe('parse date', () => {
    it('should get date from message', () => {
      let year = moment().format('YYYY')
      let month = moment().format('MM')
      let date = moment().format('DD')
      let expected = new Date(Date.UTC(year, month, date, 16, 11, 41, 80))

      let data = parser.parse(message)
      let actual = data.date

      assert.equal(actual.getTime(), expected.getTime())
    })
  })

  describe('parse coord', () => {
    it('should get coord from message', () => {
      let expected = { lng: 100.92753216, lat: 13.0998608067 }

      let data = parser.parse(message)
      let actual = data.coord

      assert.equal(parseFloat(actual.lng).toFixed(5), parseFloat(expected.lng).toFixed(5))
      assert.equal(parseFloat(actual.lat).toFixed(5), parseFloat(expected.lat).toFixed(5))
    })
  })

  describe('parse positionFixIndicator', () => {
    it('should get positionFixIndicator from message', () => {
      let expected = 1

      let data = parser.parse(message)
      let actual = data.positionFixIndicator

      assert.equal(actual, expected)
    })
  })

  describe('parse Satellites Used', () => {
    it('should get Satellites Used from message', () => {
      let expected = 7

      let data = parser.parse(message)
      let actual = data.satellitesUsed

      assert.equal(actual, expected)
    })
  })

  describe('parse HDOP', () => {
    it('should get Satellites Used from message', () => {
      let expected = 1

      let data = parser.parse(message)
      let actual = data.hdop

      assert.equal(actual, expected)
    })
  })

  describe('parse MSL Altitude', () => {
    it('should get MSL Altitude from message', () => {
      let expected = 36.078

      let data = parser.parse(message)
      let actual = data.mslAltitude

      assert.equal(actual, expected)
    })
  })

  describe('parse Geoid Separation', () => {
    it('should get Geoid Separation from message', () => {
      let expected = -29.453

      let data = parser.parse(message)
      let actual = data.geoidSeparation

      assert.equal(actual, expected)
    })
  })

  describe('parse checksum', () => {
    it('should get checksum from message', () => {
      let expected = '*59'

      let data = parser.parse(message)
      let actual = data.checksum

      assert.equal(actual, expected)
    })
  })
})

describe('parse Date', () => {
  it('should parse date', () => {
    let year = moment().format('YYYY')
    let month = moment().format('MM')
    let date = moment().format('DD')
    let expected = new Date(Date.UTC(year, month, date, 16, 11, 41, 0))

    let time = '161141.00'
    let actual = parser.parseDate(time)

    assert.equal(actual.getTime(), expected.getTime())
  })

  it('should get null when date is wrong lenght', () => {
    let expected = null
    let date = '25041'
    let time = '161141.00'
    let actual = parser.parseDate(date, time)

    assert.equal(actual, expected)
  })

  it('should get null when time is wrong lenght', () => {
    let expected = null
    let date = '250417'
    let time = '161141.0'
    let actual = parser.parseDate(date, time)

    assert.equal(actual, expected)
  })

  it('should get null when time and date are wrong lenght', () => {
    let expected = null
    let date = '250417'
    let time = '161141.0'
    let actual = parser.parseDate(date, time)

    assert.equal(actual, expected)
  })
})
