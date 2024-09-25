import express from "express";
import cookieParser from "cookie-parser"; // Corrected import for cookie-parser
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});

const app = express();




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


 