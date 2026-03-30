import express from 'express'
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carsController.js'

const router = express.Router()

router.get('/cars', getCars)
router.get('/cars/:id(\\d+)', getCar)
router.post('/cars', createCar)
router.put('/cars/:id', updateCar)
router.delete('/cars/:id', deleteCar)

export default router