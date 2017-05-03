'use strict'

import fs from 'fs'
import path from 'path'
import net from 'net'
import config from '~/config/config'
import mongoose from 'mongoose'
import mockgoose from 'mockgoose'
import logger from '~/config/logger'
import ua from 'universal-analytics'
const join = path.join
const models = join(__dirname, 'app/models')
const server = net.createServer()
const port = process.env.PORT || 3000
import * as controller from '~/app/controllers/gps'
logger.level = config.logger.level || 'debug'
const visitor = ua('UA-97830439-1')

mongoose.Promise = global.Promise

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)))

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose)
    .then(() => mongoose.connect(config.db))
  listen()
} else {
  connect()
    .on('error', logger.error)
    .on('disconnected', connect)
    .once('open', listen)
}

function listen () {
  server.listen(port, () => {
    logger.info('TCP started on port ' + port)
  })
}

function connect () {
  return mongoose.connect(config.db.uri, config.db.options).connection
}

server.on('error', (err) => {
  logger.error(`server error:\n${err.stack}`)
  server.close()
})

server.on('connection', handleConnection)

function handleConnection(conn) {
  conn.on('data', onConnData);
}

async function onConnData(msg){
  var address = server.address()
  logger.info(`server got: ${msg} from ${address.address}:${address.port}`)
  let deviceId = process.env.DEVICE_ID || '0'

  let datas = controller.onReceive(msg, deviceId)
  controller.save(datas)

  visitor.pageview('/nmea').send()
}

server.on('listening', () => {
  var address = server.address()
  logger.info(`server listening ${address.address}:${address.port}`)
})
