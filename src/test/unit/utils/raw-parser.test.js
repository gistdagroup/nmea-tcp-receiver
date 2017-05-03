/* eslint-env mocha */

'use strict'

import * as parser from '~/app/utils/raw-parser.js'
import assert from 'assert'
const message = 'GPGSV,2,2,06,19,33,122,39,20,37,256,36,,,,,,,,,1*63'

describe('Raw-parser', () => {
  describe('parse messageId message', () => {
    it('should get message id from message', () => {
      let expected = 'RAW'

      let data = parser.parse(message)
      let actual = data.messageId

      assert.equal(actual, expected)
    })
  })

  describe('parse message message', () => {
    it('should get message from message', () => {
      let expected = 'GPGSV,2,2,06,19,33,122,39,20,37,256,36,,,,,,,,,1*63'

      let data = parser.parse(message)
      let actual = data.message

      assert.equal(actual, expected)
    })
  })
})
