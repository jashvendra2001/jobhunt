import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,ref:"job",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,ref:"user",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accept","reject"],
        default:"pending"
    }     

},{timestamps:true})

const Application = mongoose.model("applicationSchema",applicationSchema)
export default Application;