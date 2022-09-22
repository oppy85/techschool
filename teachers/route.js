const express = require('express');
const router = express.Router();
const Teachers = require('./model');
const {verifyToken, verifyUser} = require('../services/middleware');

//url/api/newteacher
router.post('/newteacher', verifyUser, async (req, res)=>{
  const data = new Teachers({
    firstname: req.body.firstname,  
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  try {
    const dataTosave = await data.save();
    res.status(200).json(dataTosave)
  } catch (error) {
     res.status(400).json({message: error.message})
  }
});

//url/api/getTeachers
router.get('/getTeachers', verifyUser, async (req, res)=> {
   try {
        const data = await Teachers.find();
        res.status(200).json(data);
   } 
   catch (error) {
    res.status(500).json({message: error.message})
   }
});

//url/api/editTeacher/2
router.put('/editTeacher/:id', verifyUser, async (req, res)=> {
  try {
       const id = req.params.id;
       const dataToedit = req.body;
       const options = {new: true};
       console.log('Id = ' + id);
       const result = await Teachers.findByIdAndUpdate(id, dataToedit, options);
       res.status(200).json(result);
  } 
  catch (error) {
   res.status(500).json({message: error.message})
  }
});

//url/api/deleteTeacher/2
router.delete('/deleteTeacher/:id', verifyUser, async (req, res)=> {
  try {
       const id = req.params.id;
       console.log('Id = ' + id);
       const result = await Students.findByIdAndDelete(id);
       res.status(200).send(`data deleted successfully`);
  } 
  catch (error) {
   res.status(500).json({message: error.message})
  }
});

//url/api/getoneTeacher/2
router.get('/getoneTeacher/:id', verifyUser, async (req, res)=> {
  try {
       const id = req.params.id;
       const data = await Teachers.findById(id).exec();
       res.status(200).json(data);
  } 
  catch (error) {
   res.status(500).json({message: error.message})
  }
});


module.exports = router;