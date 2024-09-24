import { application } from "express";
import mongoose from "mongoose";


const jobSchema=new mongoose({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
        required:true
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Types.ObjectId,ref:"company",
        required:true
    },
    created_by:{
        type:mongoose.Types.ObjectId,ref:"user",
        required:true

    },
    application:{
        type:mongoose.Types.ObjectId,ref:"Application",
        
    }
 


},{timestamps:true})

const job = mongoose.model  ("jobSchema",jobSchema)
export default job