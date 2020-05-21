require('dotenv').config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { tag, password } = req.body;

    const findUser = await User.findOne({ tag });

    if(!findUser) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if(!checkPassword) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const { id, name } = findUser;

    return res.json({
      user: {
        id,
        tag,
        name,
      },
      token: jwt.sign({ id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN
      }),
    });
  }
}

export default new SessionController();
