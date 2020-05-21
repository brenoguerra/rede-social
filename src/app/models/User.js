import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  tag: String,
  email: String,
  name: String,
  password: String,
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
