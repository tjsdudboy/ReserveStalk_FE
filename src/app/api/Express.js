const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // 사용자가 정의한 User 모델

const router = express.Router();

router.post('/api/signup', async (req, res) => {
  const { username, name, email, password, checkPassword, role } = req.body;

  if (password !== checkPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    email,
    password: hashedPassword,
    role
  });

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
