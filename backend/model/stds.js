// Defining the schema of documents
var mongoose = require('mongoose');
var studentsSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
email:{
  type:String,
  required:true
},
password:{
    type:String,
    required:true
}
 /* name: {
    type:String,
    required:true,
    unique:true,
    minlength:3
  },
  email:{
    type:String,
    required:true
  },
  contact:{
    type:Number,
    required:true,
    unique:true
  },
  is_deleted:{
    type:Boolean
  }*/ 
});
 // mongoose.model('Blogs',studentsSchema);
 // here we create collection named as student
const student = new mongoose.model('Student', studentsSchema);
module.exports = student;

// inserting documents fields values
/*
const createDocument = async()=>{
    try {
        const shyam = new student({
            id:1,
            name: 'shyam',
            email: 'shyam@gmail.com',
            contact: 987456123,
            is_deleted:true
          });
          const krishna = new student({
            id:2,
            name: 'krishna',
            email: 'krishna@gmail.com',
            contact: 2365498456,
            is_deleted:false
          });
          // saving multiple documents using array of documents
          const result = await student.insertMany([shyam,krishna]);

          // const result = await  ram.save(); // save single document
           console.log(result);
    } catch (error) {
        console.log(error);

    }

}
 createDocument();
*/
// Reading Documents
