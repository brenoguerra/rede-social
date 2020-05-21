import Post from '../models/Post';
import Comment from '../models/Comment';
import fs from 'fs';
import { resolve } from 'path';

class PostController {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    const { id, author, place, description, image, likes } = posts;

    const comments = await Comment.find({});

    return res.json({
      posts,
      comments
    });
  }

  async store(req, res) {
    const { place, description } = req.body;
    const { filename: image } = req.file;

    const post = await Post.create({
      author: req.userId,
      place: 'Brazil',
      description: 'teste',
      image: image
    });

    return res.status(200).json(post);
  }

  async delete(req, res) {
    const { id } = req.params;

    const post = await Post.findById(id);

    if(!post) {
      return res.status(400).json({ error: 'Publicação não encontrada' });
    }

    const comments = await Comment.find({ post: post.id });

    if(comments) {
      await Comment.findByIdAndRemove(comments);
    }

    fs.unlinkSync(resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', post.image));

    await Post.findByIdAndRemove(id);

    return res.status(200).json('Deletado');
  }
}

export default new PostController();
