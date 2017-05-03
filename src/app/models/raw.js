'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RawSchema = new Schema({
  deviceId: { type: String, required: true },
  message: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'raw' })

export default mongoose.model('Raw', RawSchema)
