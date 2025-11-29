import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, default: 'user' },
  ts: { type: Number, default: () => Date.now() }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
