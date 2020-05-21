import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  post: String,
  author: String,
  content: String,
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
