import express from "express"
import { companyRegister, getById, getCompany, updateCompany } from "../controller/company.controller.js"
import isAuthentication from "../middleware/isAuthenticate.js"

const router = express.Router()

router.route("/companyRegister").post(isAuthentication,companyRegister)
router.route("/findCompany").get(isAuthentication,getCompany)
router.route("/updateCompany/:id").post(isAuthentication,updateCompany)
router.route("/getBYID/:id").get(isAuthentication,getById)



export default   router

