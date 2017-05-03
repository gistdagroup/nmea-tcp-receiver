/* eslint-env mocha */

'use strict'

import * as parser from '~/app/utils/raw-parser.js'
import assert from 'assert'
const message = 'GPGSV,2,2,06,19,33,122,39,20,37,256,36,,,,,,,,,1*63'

describe('Raw-parser', () => {
  describe('parse raw message', () => {
    it('should get raw from message', () => {
      let expected = 'GPGSV,2,2,06,19,33,122,39,20,37,256,36,,,,,,,,,1*63'

      let data = parser.parse(message)
      let actual = data.raw

      assert.equal(actual, expected)
    })
  })
})
