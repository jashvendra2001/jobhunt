import express from "express";
import cookieParser from "cookie-parser"; // Corrected import for cookie-parser
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});

const app = express();

app.get("/Home",(req,res)=>{
    return(
        res.status(200).json({
            mesage:"I am coming from backend",
            success:true

        })
    )
})
// GK6Yd134tMMwBGbF
// jschauhan2001
// const adata=mongodb+srv://jschauhan2001:GK6Yd134tMMwBGbF@cluster0.vd7pt.mongodb.net/


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

const optionCors = {
  origin: "http://localhost:3000", // Corrected URL
  credentials: true,
};

app.use(cors(optionCors));

const port = 8000;


app.use("/api/v1/user",userRoute)



app.listen(port, () => {
    connectDB()
  console.log(`Server is running on port ${port}`);
});


 