//const http = require('http');
const config = require("dotenv").config();
const express =require("express");
const app = express();
const port = process.env.PORT || "8080";
require('./services/db.service');
const student = require('./students/route');
const teacher = require('./teachers/route');
const auth = require('./services/auth');
const authTeacher = require('./services/authTeacher');

app.use(express.json());

app.get("/", (req, res) => {
   res.json({ message: "Welcome to Student Management app"})
});

app.use('/api/students', student); //localhost:3200/api/student/newstudent
app.use('/api/teachers', teacher);
app.use('/api/auth', auth);
app.use('/api/auth', authTeacher);

app.listen(port,  () => {
  console.log(`Server running at ${port}/`); 
});  
// npm init create package.json
// npm install mongoose express dotenv