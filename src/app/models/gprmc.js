'use strict'

import mongoose, { Schema } from 'mongoose'

const GprmcSchema = new Schema({
  deviceId: { type: String, required: true },
  date: { type: Date, required: true },
  coord: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  status: { type: String },
  sog: { type: Number },
  cog: { type: Number },
  velocity: { type: Number },
  mv: { type: String },
  checksum: { type: String }
}, {
  timestamps: true,
  collection: 'gprmc' })

export default mongoose.model('Gprmc', GprmcSchema)
