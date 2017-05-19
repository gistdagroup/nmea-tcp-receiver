'use strict'

import mongoose, { Schema } from 'mongoose'

const RawSchema = new Schema({
  deviceId: { type: String, required: true },
  message: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'raw' })

export default mongoose.model('Raw', RawSchema)
