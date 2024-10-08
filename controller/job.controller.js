import job from "../models/job.model.js";


export const  jobCreate = async (req,res)=>{

   try {
  const {title , description , requirements , salary , experienceLevel , location , jobType , position , company123, created_by}=req.body;
  let userId = req.userId || req.user?.id; 


  console.log(userId)

  if( !title || !description || !requirements || !salary || !experienceLevel || !location || ! jobType ||! position || ! company123  || ! created_by)
  {
    return res.status(401).json({
        message:"something missing",
        success:false
    })

   
  }

 
  
    const jobs = await job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary,
        experienceLevel,
        location,
        jobType,
        position,
        company123,
        created_by:userId
       })


       return res.status(200).json({
        message:"job create successfully",
        success:true,
        jobs
       })
    
   } catch (error) {
    console.log(error)

    
   }
}


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const description = req.query.description || "";

        let query = {};

        // Building the query based on keyword or description
        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            };
        } else if (description) {
            query = {
                description: { $regex: description, $options: "i" }
            };
        }

        // Fetching jobs and populating the 'created_by' field
        const jobs = await job.find(query).populate({
            path: 'created_by' 
        });

        // Check if jobs exist
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        // Returning the response
        return res.status(200).json({
            message: "Jobs found successfully",
            success: true,
            data: jobs // Changed 'jobs' to 'data' for clarity
        });

    } catch (error) {
        console.error("Error fetching jobs:", error); // Added more context to the error log
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};



export const getJobBYId = async (req,res)=>{
    try {
        const jobId = req.params.id;

    const jobs = await job.findById(jobId)

    if(!jobs)
    {
        return res.status(400).json({
            message:"jobs not found",
            success:false
        })
    
    }


    return res.status(200).json({
        message:"job found succeessfully",
        success:true,
        jobs
    })
        
    } catch (error) {
        console.log(error)
        
    }
}


export const getAdminJob = async(req,res)=>{
    const AdminId = req.id;

    const jobs = await job.find({created_by:AdminId})

    if(!jobs)
    {
        return res.status(400).json({
            message:"jobs not found",
            success:false
        })

    }

    return res.status(200).json({
        message:" Admin job found succeessfully",
        success:true,
        job
    })
}


