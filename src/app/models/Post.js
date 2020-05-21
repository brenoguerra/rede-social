import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
