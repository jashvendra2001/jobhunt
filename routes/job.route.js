import express from "express"
import { getAllJobs, jobCreate,getJobBYId } from "../controller/job.controller.js"
import isAuthentication from "../middleware/isAuthenticate.js"

const  router = express.Router()
router.route("/jobregister").post(isAuthentication,  jobCreate)
router.route("/getAllJObs").get(isAuthentication,  getAllJobs)
router.route("/getJobBYId/:id").get(isAuthentication,  getJobBYId)


export default router