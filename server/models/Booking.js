import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  placeId: String,
  placeTitle: String,
  roomId: String,
  roomTitle: String,
  checkin: String,
  travelers: String,
  nights: Number,
  food: Object,
  foodTotal: Number,
  roomPrice: Number,
  total: Number,
  status: { type: String, default: 'Upcoming' },
  ts: { type: Number, default: () => Date.now() }
}, { timestamps: true })

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
