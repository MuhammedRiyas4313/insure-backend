import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body; // Changed from email to username

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await (admin as any).comparePassword(password))) {
      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '30d' }
      );

      res.json({
        _id: admin._id,
        username: admin.username,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
