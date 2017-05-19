'use strict'

import mongoose, { Schema } from 'mongoose'

const GpggaSchema = new Schema({
  deviceId: { type: String, required: true },
  date: { type: Date, required: true },
  coord: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  positionFixIndicator: { type: Number },
  satellitesUsed: { type: Number },
  hdop: { type: Number },
  mslAltitude: { type: Number },
  geoidSeparation: { type: Number },
  checksum: { type: String }
}, {
  timestamps: true,
  collection: 'gpgga' })

export default mongoose.model('Gpgga', GpggaSchema)
