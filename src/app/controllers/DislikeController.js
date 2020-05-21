import Post from '../models/Post';

class DislikeController {
  async store(req, res) {
    const { id } = req.params;

    const post = await Post.findById(id);

    post.likes = parseInt(post.likes - 1);

    await post.save();

    return res.json(post);
  }
}

export default new DislikeController();
