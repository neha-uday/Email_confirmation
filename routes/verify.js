const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const User = require('../model/userSchema');
const app= express();

app.post('/verify',async (req, res) => {
    try {
      const { secretToken } = req.body;

      // Find account with matching secret token
      const user = await User.findOne({ 'secretToken': secretToken });
      if (!user) {
        res.status(400).send("User Not found!!")
        return;
      }

      
      
      user.secretToken = '';
      await user.save();

      res.status(200).send("Email Verified!!");
    } catch(error) {
      res.status(403).send("Error");
    }
});
module.exports = router;