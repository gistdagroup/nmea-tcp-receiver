'use strict'

import mongoose, {Schema} from 'mongoose'

const LocationSchema = new Schema({
  type: {type: String, required: true},
  date: {type: Date, required: true},
  coord: {
    lng: {type: Number, required: true},
    lat: {type: Number, required: true}
  },
  hdop: {type: Number},
  vehicle: {type: String},
  hash: {type: String, required: true, unique: true}
}, {collection: 'location'})

export default mongoose.model('Location', LocationSchema)
