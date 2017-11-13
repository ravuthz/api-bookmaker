import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../mailer';

const router = express.Router();

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.json({ users });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/', (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.confirmed = false;
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then((userSaved) => {
      sendConfirmationEmail(userSaved);
      res.json({ user: userSaved.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(404).json({ errors: parseErrors(err.errors) });
    res.json({ user });
  });
});

router.put('/:id', (req, res) => {
  const { email, password, confirmed } = req.body.user;
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(404).json({ errors: parseErrors(err.errors) });
    user.email = email;
    user.confirmed = confirmed;
    user.setPassword(password);
    user.setConfirmationToken();
    user
      .save()
      .then((userSaved) => {
        res.json({ user: userSaved.toAuthJSON() });
      })
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.status(404).json({ errors: parseErrors(err.errors) });
    res.json({ success: true });
  });
});

export default router;
