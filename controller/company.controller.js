import Company from "../models/company.model.js";

export const companyRegister = async(req,res)=>{
   try {
    const{Name,description,website,logo}=req.body;
    let companyName = Name

    console.log(req.userId)

    if(!companyName){
        return res.status(400).json({
            message:"company name is required",
            success:false
        })
    }

    const company = await Company.findOne({
        Name:companyName
    })

    if(company)
    {
     return res.status(400).json({
        message:"company is already register",
        success:true
     })
    }

    const newCompany = await Company.create({
        Name:companyName,
        description:description,

        userId:req.id
    })

    return res.status(200).json({
        message:"company register successfully",
        success:true,
        newCompany

    })

   
    
   } catch (error) {
    console.log(error)
    
   }
}

export const getCompany=async(req,res)=>{
   try {
    const user = req.body.id;
    const findCompany = await Company.find({user})


    if(!findCompany)
    {
        return res.status(401).json({
            message:"company not found",
            success:false
        })
    }

    return res.status(200).json({
        message:"company find successfully",
        success:true,
        findCompany
    })
    
   } 
   
   catch (error) {
    console.log(error)
    
   }
    
}

export const getCompanyById = async(req,res)=>{
   
    try {

        const companyId = req.params.id
         const company = await Company.findById(companyId) .populate({
            path:"user"
         }) 
         
         if(!company)
         {
            return res.status(401).json({
                message:"company not found"
            })
         }

         return res.status(200).json({
            company,
            success:true,
            message:"company successfully found"
         })
        


    } catch (error) {
        console.log(error)
        
    }

}

export const  updateCompany = async (req,res)=>{

    const{Name,description,website,logo,userId}=req.body

    const companyUpdate = {Name,description,website,logo,userId}
     
     const updatedCompanyData = await Company.findByIdAndUpdate(req.params.id,companyUpdate,{new:true})

     if(!updatedCompanyData){
        return res.status(400).json({
            message:"company data not updated",
            success:false
        })
     }

     return res.status(200).json({
        message:"company data update successfully",
        updatedCompanyData,
        success:true
     })

}


export const getById = async(req,res)=>{
            

              const companyID = req.params.id

              const company = await Company.findById(companyID) 

              console.log(company)

              if(!company)
              {
                return res.status(400).json({
                    message:"company data not updated",
                    success:false
                })

              }

              return res.status(200).json({
                message:"company data update successfully",
                success:true
             })

              
}