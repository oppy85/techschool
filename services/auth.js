const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../students/model');

router.post('/studentlogin', async (req, res)=>{
  try {
    const user = await Student.findOne({
        email: req.body.email,
        username: req.body.username
    });
    !user && res.status(401).json("Wrong Username");
    const accessToken = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    },
    process.env.JWT_KEY,
    {expiresIn: "2d"}
    );
    const {...others} = user._doc;
    res.status(200).json({...others, accessToken});

  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

module.exports = router;