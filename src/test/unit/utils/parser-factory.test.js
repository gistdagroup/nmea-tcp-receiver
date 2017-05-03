/* eslint-env mocha */

'use strict'

import * as factory from '~/app/utils/parser-factory'
import assert from 'assert'

describe('Parser Factory', () => {
  it('should parse with gpgga parser from message', () => {
    let parsed = factory.parse('GPGGA,161141.80,1305.9916484,N,10055.6519296,E,1,07,1.0,36.078,M,-29.453,M,529.8,*59')

    assert.equal(parsed.messageId, 'GPGGA')
    assert.equal(parsed.hdop, 1)
    assert.equal(parsed.status, undefined)
  })

  it('should parse with gpmrc parser from message', () => {
    let parsed = factory.parse('GPRMC,161141.00,A,1305.9916182,N,10055.6519622,E,0.25,352.96,250417,0.0,E,A*39')

    assert.equal(parsed.messageId, 'GPRMC')
    assert.equal(parsed.hdop, undefined)
    assert.equal(parsed.status, 'A')
  })

  it('should parse with raw parser from message', () => {
    let parsed = factory.parse('GPGSV,2,2,06,19,33,122,39,20,37,256,36,,,,,,,,,1*63')

    assert.equal(parsed.message, 'GPGSV,2,2,06,19,33,122,39,20,37,256,36,,,,,,,,,1*63')
    assert.equal(parsed.messageId, factory.RAW)
  })

  it('should get null0 from unknow message', () => {
    let parsed = factory.parse('xxx')

    assert.equal(parsed, null)
  })
})
