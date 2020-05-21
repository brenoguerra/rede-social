import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';
import LikeController from './app/controllers/LikeController';
import DislikeController from './app/controllers/DislikeController';
import CommentController from './app/controllers/CommentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/register', UserController.store);
routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.delete('/posts/:id/delete', PostController.delete);

routes.post('/posts/:id/like', LikeController.store);
routes.post('/posts/:id/comment', CommentController.store);

routes.post('/posts/:id/dislike', DislikeController.store);
routes.post('/posts/:id/uncomment', CommentController.delete);

export default routes;
