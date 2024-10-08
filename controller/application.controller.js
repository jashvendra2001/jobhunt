
import Application from "../models/application.model.js"
import Job from "../models/job.model.js"
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      user: userId,
      job: jobId,
    }).populate({
      path:"title"
    })

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add the application to the job instance
    job.applications.push(newApplication._id);  // Push to the job instance

    // Save the updated job document
    await job.save();

    return res.status(200).json({
      message: "Job applied successfully",
      success: true,
      newApplication
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};



export const getAppliedJobs = async (req, res) => {
  try {
    const userID = req.id;

    const appliedJobs = await Application.find({ applicant: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
      populate:{
        path:"company123"
      }
        
      });

    if (appliedJobs.length === 0) {
      return res.status(404).json({
        message: "No applied jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applied jobs retrieved successfully",
      success: true,
      appliedJobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching applied jobs",
      success: false,
      error: error.message,
    });
  }
};


export const getApplicant = async (req, res) => {
  try {
    const userId = req.params.id;
    const job = await Job.findById(userId).populate({
      path: "applications",
      options:{sort:{createdAt:-1}},
      populate: {
        path: "applicant"
      }
    });

    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Job found",
      success: true,
      data: job
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
};



export const updateStatus =async(req,res)=>{
  try {
    const {status} =req.body;
    
    const ApplicationId = req.params.id;

    if(!status){
      return res.status(400).json({
        message: "status not found",
        success: false
      });

    }

    const application = await Application.findOne({_id:ApplicationId})

    if(!application)
      return res.status(400).json({
        message: "status not found",
        success: false
      });


      application.status = status.toLowerCase();

      await application.save();
      return res.status(200).json({
        message:"status upadate successfully",
        successs:true
      })
    
  } catch (error) {
    console.log(error)
    
  }
}