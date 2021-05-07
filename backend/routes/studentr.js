const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var student = require('../model/stds');
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
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
    res.send(updatedata);
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
module.exports = router;
