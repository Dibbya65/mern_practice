import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, 'test', {
      expiresIn: '1h',
    });

    return res.status(200).json({ result: user, token });
  } catch (error) {
    return res.status(500).json({ message: 'Something wrong' });
  }
};
export const signup = async (req, res) => {
  // console.log(req.body);
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  // console.log(email);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: 'User already exist' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password didnot match' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    // these is for sending to frontend

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });
    return res.status(201).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: 'Something wrong' });
  }
};
