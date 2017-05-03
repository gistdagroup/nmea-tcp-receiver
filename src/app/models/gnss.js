'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GnssSchema = new Schema({
  imei: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String },
  angle: { type: Number },
  speed: { type: Number },
  lat: { type: Number },
  hdop: { type: Number },
  coord: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  sats: { type: Number },
  satprn: { type: String },
  area: { type: String },
  cellId: { type: String },
  gsmSignel: { type: String }
}, {
  timestamps: true,
  collection: 'gnss' })

export default mongoose.model('Gnss', GnssSchema)
