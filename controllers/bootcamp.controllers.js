const Bootcamp = require('../models/bootcampmodel');
const { customMiddleware } = require('../middleware/CustomMiddleware');
const asyncMiddleware = require('../Middleware/middleware');

exports.getAllBootcamps = asyncMiddleware(async (req,res, next) => { //Function to read information of all courses 
    //const courses = await Course.find({bootcamp: req.params.id}).sort('name'); //find and sort all records according to name.

    //sending empty because no criteria needed and we want all documents
      let pathToPopulate="";
      let result = await customMiddleware(Bootcamp, {}, { name: req.query.sortBy }, req.query, pathToPopulate,next);
    
      res.send(result);
});

exports.getBootcamp = asyncMiddleware(async(req,res) => { //Function to read information of a course according to its id
    const course = await Bootcamp.findById(req.params.id); //find the record according to ID.
    if(!course) return res.send("The course with the given ID not found"); //if not found display am appropriate message
    res.send(course); //to displays the founded course information from courses array 
});

exports.postBootcamp = asyncMiddleware(async (req,res) => { //Function to create a new course.
  req.body.author =  req.userID
  const course = new Bootcamp(req.body); 
  const result = await course.save(); //save the new record 
  res.send(result); //to display the newly added record
});

exports.putBootcamp = asyncMiddleware(async (req,res) => { //Function to update an existing course.
  // if (req.body.author.valueOf() !== req.userID){
  //   return res.send("Invalid user")
  // }

  const course = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,
    {new: true,
    runValidators: true}  ); //find the record according to id and update with the given query in body text.
  if(!course) return res.send("The course with the given ID not found"); //if not found display am appropriate message
  
  const result = await course.save(); //save the record 
  res.send(result); //display the record

});

exports.deleteBootcamp = asyncMiddleware( async (req,res) => { //Function to delete a function by ID.
  // if (req.body.author.valueOf() !== req.userID){
  //   return res.send("Invalid user")
  // }

  const result = await Bootcamp.findByIdAndRemove(req.params.id); //find the record according to id and remove
  if(!result) return res.send("The course with the given ID not found"); //if not found display am appropriate message
  res.send(result); //display the deleted record
 });