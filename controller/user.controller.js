import User  from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// const User = require('../models/User');
export const register=async (req,res)=>{
    try{
        const{fullname,email,phoneNumber,password,role}=req.body
        if(!fullname || !email || !phoneNumber|| !password || !role){

           return res.status(400).json({
                message:"something is missing",
                success:false

            })}

            const user = await User.findOne({email})

            if(user)
            {
                res.status(400).json({
                    message:"user is already present ",
                    success:false
                })
            }
  
            const hashpassword= await bcrypt.hash(password,10);
         
             await User.create({
                fullname,
                email,
                phoneNumber,
                password:hashpassword,
                role

             })

             return res.status(200).json({
                message:" user Register successfully ",
                success:true
             })


    }
    catch(e){
        console.log(e)

    }
}



//login

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if required fields are present
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        // Find the user by email or username (assume login is email for now)
        const user = await User.findOne({ email}); // Assuming login is email; modify if username is needed

        if (!user) {
            return res.status(400).json({
                message: "Invalid email",
                success: false,
            });
        }

        // Compare the input password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
                success: false,
            });
        }

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false,
            });
        }

        // Create token payload
        const tokenData = {
            userId: user._id,
            role: user.role
        };

        // Sign the JWT token with the secret key
        const token = jwt.sign(tokenData, process.env.SECRATE_KEY, { expiresIn: '1h' });

        // Data to return (without password)
        const userData = {
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
        };

        // Set the token in cookies and send the response
        res.cookie('authToken', token, {
            httpOnly: true, // Protect cookie from being accessed by JavaScript in the browser
            maxAge: 60 * 60 * 1000, // 1 hour
        }).status(200).json({
            message: "Welcome back",
            success: true,
            data: userData,
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


//logout

export const logout=async(req,res)=>{
    
    return res.status(200).cookie("authToken","",{expires: new Date(0)}).json({
        message:"logout successfully",
        success:true
    })
}

//update




export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        // Check if all required fields are present
    let skillArray  
  if(skills){

     skillArray = skills.split(",");
  }
        

        // Extract the user ID from the JWT payload (already verified by the middleware)
        console.log(req)
        const userId = req.id;

        // Find the user by ID
        let user = await User.findById(userId);
        console.log(user)

        // If the user does not exist
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Update user profile fields

        if(fullname){
            user.fullname = fullname;
        }
        if(email){
            user.email = email;

        }
        if(phoneNumber)
        {
            user.phoneNumber = phoneNumber;

        }
        if(bio)
        {
            user.profile.bio = bio;

        }
        if(skills)
        {
            user.profile.skills = skillArray;
            
        }
       
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user, // Send the updated user object (optional)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
            success: false,
        });
    }
};




