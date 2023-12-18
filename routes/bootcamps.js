// Creating an express file:
const express = require('express')

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps.js')

const Bootcamp = require('../models/Bootcamp.js')

const advancedResults = require('../middleware/advancedResults.js')

// Include other resources routers
const courseRouter = require('./courses.js')

const router = express.Router()

const { protect } = require('../middleware/auth')

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo').put(protect, bootcampPhotoUpload)

// Get bootcamps & post bootcamp
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)

// Get, put & delete bootcamp
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

module.exports = router
