require('dotenv').config();

import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: true });
  }
}

export default new Database();
