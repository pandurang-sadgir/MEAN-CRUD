const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var student = require('../model/stds');
const bcrypt = require('bcrypt');
   // mongoose = require('mongoose'), //mongo connection
   // bodyParser = require('body-parser'), //parses information from POST
   // methodOverride = require('method-override'); //used to manipulate POST
   
 router.use(express.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('the student router is working');
});

// API-INSERT DATA
router.post('/insertdata',async(req,res)=>{
  try {
    const Student = new student(req.body);
  const newStudent = await Student.save();
  res.status(201).send(newStudent);
  } catch (error) {
    res.status(400).send(error);
  }

});

// API-GET ALL STUDENT DATA

router.get('/getdata',async(req,res)=>{
try {
  const allStudentData = await student.find();
  console.log(allStudentData);
  res.send(allStudentData);
} catch (error) {
  res.send(error);
}
});

// API-GET SPECIFIC STUDENT DATA BY ID

router.get('/getdata/:id',async(req,res)=>{
  try {
    const _id = req.params.id;
    const singleData = await student.findById(_id);
    if(!singleData){
      return res.status(404).send('not valid');

    }else{
      console.log(singleData);
      res.send(singleData);
    }
  } catch (error) {
    res.send(error);
  }


});

// API UPDATE DATA


router.patch('/update/:id', async(req,res) =>{
  try {
    const _id = req.params.id;
   const updatedata = await student.findByIdAndUpdate(_id,req.body,{new:true}); //syntax {id,update_data,options}
   const Student = new student(updatedata);
   const newupdate =  await Student.save();
    res.send(newupdate);
  } catch (error) {
    res.send(error);
  }

});

// API DELETE DATA

router.delete('/delete/:id', async(req,res) =>{
  try {
    const _id = req.params.id;
   const deletedata = await student.findByIdAndDelete(_id); //syntax {id,update_data,options}
    res.send(deletedata);
  } catch (error) {
    res.send(error);
  }

});

router.post('/login',async(req,res)=>{
  try {
    if(req.body.email != null && req.body.password != null ){
      const email = req.body.email;
    const password = req.body.password;
    const useremail =  await student.findOne({email:email}); // checking db email with user email
    const ismatch = await bcrypt.compare(password,useremail.password); // user entered pw and db pw
    //console.log(useremail);
    if(ismatch){
      res.status(200).send(useremail);

    }else{
      res.json({ack:'Invalid login details'});
    }
    }else{
      res.json({ack:'Invalid login details'});
    }

  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
