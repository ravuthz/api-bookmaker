import express from 'express';
import authenticate from '../middlewares/authenticate';
import Post from '../models/Post';
import parseErrors from '../utils/parseErrors';

const router = express.Router();
router.use(authenticate);

const responeHandler = (err, res, data) => {
  let errors = null;
  if (err) {
    errors = parseErrors(err.errors);
    res.status(400);
  }
  res.json({ errors, data });
};

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => responeHandler(err, res, posts));
});

router.post('/', (req, res) => {
  const data = { ...req.body.post, userId: req.currentUser._id };
  Post.create(data, (err, post) => responeHandler(err, res, post));
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => responeHandler(err, res, post));
});

router.put('/:id', (req, res) => {
  const data = { ...req.body.post, userId: req.currentUser._id };
  Post.findByIdAndUpdate(req.params.id, data, (err, post) => responeHandler(err, res, post));
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, err => responeHandler(err, res, null));
});

export default router;
