const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require('../models/register')

router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword
      });
  
      await user.save();
  
      res.status(201).json({ message: "User created" });
      console.log("user registered")
    } catch (err) {
      console.log("user not registered")
      res.status(500).json({ message: err.message });
    }
  });
  
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log("invalid creds")
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.log("invalid creds")
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, "secret");
  
      res.json({ token });
      console.log("logged in")
    } catch (err) {
      console.log("invalid creds")
      res.status(500).json({ message: err.message });
    }
  });  

module.exports = router;