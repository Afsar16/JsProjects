import jwt from 'jsonwebtoken';

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      verifiedStudent: user.verifiedStudent
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export default generateToken;
