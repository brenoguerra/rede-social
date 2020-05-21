import Comment from '../models/Comment';

class CommentController {
  async store(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.create({
      post: id,
      author: req.userId,
      content
    });

    return res.status(200).json(comment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if(!comment) {
      return res.status(400).json({ error: 'Comentário não encontrado' });
    }

    await Comment.findByIdAndRemove(id);

    return res.status(200).json('Descomentado');
  }
}

export default new CommentController();
