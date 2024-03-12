const express = require('express')
const router = express.Router();

// Middleware to attach users to the request
router.use((req, res, next) => {
    req.users = req.app.locals.users; // Assuming users are loaded and stored in app.locals
    next();
  });
  
  // Route to list all usernames
  router.get('/usernames', (req, res) => {
    const usernames = req.users.map(user => ({ id: user.id, username: user.username }));
    res.json(usernames);
  });
  
  // Route to search for a user by username
  router.get('/user', (req, res) => {
    const { username } = req.query;
    const user = req.users.find(user => user.username === username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: { message: 'User not found', status: 404 }});
    }
  });
  
  module.exports = router;