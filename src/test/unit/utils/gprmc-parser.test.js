/* eslint-env mocha */

'use strict'

import * as parser from '~/app/utils/gprmc-parser.js'
import assert from 'assert'
const message = 'GPRMC,161141.00,A,1305.9916182,N,10055.6519622,E,0.25,352.96,250417,0.0,E,A*39'

describe('GPRMC-parser', () => {
  describe('parse message Id', () => {
    it('should get message id from message', () => {
      let expected = 'GPRMC'

      let data = parser.parse(message)
      let actual = data.messageId

      assert.equal(actual, expected)
    })
  })

  describe('parse date', () => {
    it('should get date from message', () => {
      let expected = new Date(Date.UTC(2017, 4, 25, 16, 11, 41, 0))

      let data = parser.parse(message)
      let actual = data.date

      assert.equal(actual.getTime(), expected.getTime())
    })
  })

  describe('parse status', () => {
    it('should get status from message', () => {
      let expected = 'A'

      let data = parser.parse(message)
      let actual = data.status

      assert.equal(actual, expected)
    })
  })

  describe('parse coord', () => {
    it('should get coord from message', () => {
      let expected = { lng: 100.927532703333333, lat: 13.09986030333 }

      let data = parser.parse(message)
      let actual = data.coord

      assert.equal(parseFloat(actual.lng).toFixed(5), parseFloat(expected.lng).toFixed(5))
      assert.equal(parseFloat(actual.lat).toFixed(5), parseFloat(expected.lat).toFixed(5))
    })
  })

  describe('parse Speed Over Ground', () => {
    it('should get speed over ground from message', () => {
      let expected = 0.25

      let data = parser.parse(message)
      let actual = data.sog

      assert.equal(actual, expected)
    })
  })

  describe('parse Course Over Ground', () => {
    it('should get Course Over Ground from message', () => {
      let expected = 352.96

      let data = parser.parse(message)
      let actual = data.cog

      assert.equal(actual, expected)
    })
  })

  describe('parse velocity', () => {
    it('should get velocity from message', () => {
      let expected = 0

      let data = parser.parse(message)
      let actual = data.velocity

      assert.equal(actual, expected)
    })
  })

  describe('parse Magnetic Variation', () => {
    it('should get Course Over Ground from message', () => {
      let expected = 'E'

      let data = parser.parse(message)
      let actual = data.mv

      assert.equal(actual, expected)
    })
  })

  describe('parse checksum', () => {
    it('should get checksum from message', () => {
      let expected = 'A*39'

      let data = parser.parse(message)
      let actual = data.checksum

      assert.equal(actual, expected)
    })
  })
})

describe('parse Date', () => {
  it('should parse date', () => {
    let expected = new Date(Date.UTC(2017, 4, 25, 16, 11, 41, 0))
    let date = '250417'
    let time = '161141.00'
    let actual = parser.parseDate(date, time)

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
