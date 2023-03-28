const express = require('express');
const getCourses = require('./coursesRoutes');
const router =  //setting up express router
express.Router({mergeParams: true})
//All CRUD endpoints

const bootcampController = require('../controllers/bootcamp.controllers')
router.get("/", bootcampController.getAllBootcamps); //to read information of all bootcamp
router.get("/:id", bootcampController.getBootcamp); //to read information of spicific course according to id
router.post("/", bootcampController.postBootcamp); //to create a new course
router.put("/:id" , bootcampController.putBootcamp); //to update a course information according to its id
router.delete("/:id", bootcampController.deleteBootcamp); //to delete a course according to its id
router.use("/:id/courses", getCourses);


module.exports  = router;