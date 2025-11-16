import express from "express" ; 
import jobsController from "../controllers/jobs.controller.js";


const router = express.Router() ; 
router.post('/' , jobsController.createJob) ; 
router.get('/' , jobsController.getAllJobs) ; 
router.get('/:id' , jobsController.getJob) ; 
router.patch('/:id' , jobsController.updateJob) ; 
router.delete('/:id' , jobsController.deleteJob) ; 



export default router ; 