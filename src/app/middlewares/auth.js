require('dotenv').config();

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ error: 'Necessário estar logado para executar essa ação' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}
