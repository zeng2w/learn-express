const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()

// Route to add a new user
router.post('/adduser', (req, res) => {
    const newuser = req.body;
    req.app.locals.users.push(newuser); // Add the new user to the local users array
  
    // Write the updated users array back to the file
    fs.writeFile(path.resolve(__dirname, '../data/users.json'), JSON.stringify(req.app.locals.users), (err) => {
      if (err) {
        console.log('Failed to write');
        res.status(500).json({ error: { message: 'Failed to save user', status: 500 }});
      } else {
        console.log('User Saved');
        res.send('User added successfully');
      }
    });
  });
  
  module.exports = router;