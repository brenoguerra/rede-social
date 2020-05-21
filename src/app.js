import express from 'express';

import database from './database';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    database;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
