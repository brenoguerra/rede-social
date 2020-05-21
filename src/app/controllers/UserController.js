import bcrypt from 'bcryptjs';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const { tag, name, email, password } = req.body;

    if(tag == null || tag == undefined) {
      return res.status(400).json({ error: 'Tag inválida' });
    }

    if(name == null || name == undefined) {
      return res.status(400).json({ error: 'Nome inválido' });
    }

    if(email == null || email == undefined) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    if(password == null || password == undefined) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    const findTag = await User.findOne({ tag });

    if(findTag) {
      return res.status(400).json({ error: 'Tag em uso' });
    }

    const findUser = await User.findOne({ email });

    if(findUser) {
      return res.status(400).json({ error: 'E-mail em uso' });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    await User.create({
      tag,
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      tag: tag,
      name: name,
      email: email
    });
  }
}

export default new UserController();
