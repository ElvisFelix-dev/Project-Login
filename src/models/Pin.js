import { Schema, model } from 'mongoose'

const PinSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      min: 3,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    lat: {
      type: Number,
      required: true,
    },

    lon: {
      type: Number,
      required: true,
    },

    descr: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default model('Pin', PinSchema)