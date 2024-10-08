import express from "express"

import isAuthentication from "../middleware/isAuthenticate.js"
import { applyJob, getApplicant, getAppliedJobs, updateStatus } from "../controller/application.controller.js"


const router = express.Router()

router.route("/applyJob/:id").post(isAuthentication,applyJob)
router.route("/getAppliedJobs").get(isAuthentication,getAppliedJobs)
router.route("/getApplicant/:id").get(isAuthentication,getApplicant)
router.route("/updateStatus/:id").post(isAuthentication,updateStatus)




export default   router