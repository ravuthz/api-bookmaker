import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './routes/auth';
import users from './routes/users';
import books from './routes/books';
import posts from './routes/posts';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/posts', posts);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`Running on localhost:${port}`));
