export const validateUser = (type) => (req, res, next) => {
  if (!req.body) return res.status(400).send('Request body is missing');

  const { name, email, password } = req.body;

  // Registration validation
  if (type === 'register') {
    if (!name) return res.status(400).send('Name is required');
    if (!email) return res.status(400).send('Email is required');
    if (!password) return res.status(400).send('Password is required');
  }

  // Email format check (only if email is provided)
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).send('Invalid email format');
  }

  // Password length check (if password is provided)
  if (password && password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters');
  }

  next();
};