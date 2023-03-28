const express = require('express');
const router =  express.Router({mergeParams: true}) //setting up express router
//const Course = require('../models/coursemodel')

//All CRUD endpoints

const coursesController = require('../controllers/courses.controllers')
router.get("/",  coursesController.getAllCourses); //to read information of all courses
router.get("/:courseId",  coursesController.getCourse); //to read information of spicific course according to id
router.post("/",  coursesController.postCourse); //to create a new course
router.put("/:courseId",  coursesController.putCourse); //to update a course information according to its id
router.delete("/:courseId",  coursesController.deleteCourse); //to delete a course according to its id



module.exports  = router;