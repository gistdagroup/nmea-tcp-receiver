'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RawSchema = new Schema({
  deviceId: { type: String },
  message: { type: String }
}, {
  timestamps: true,
  collection: 'raw' })

export default mongoose.model('Raw', RawSchema)
