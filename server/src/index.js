import express from "express"
import dotenv from "dotenv"
import dbConnect from "./utils/db.js";
import router from "./routes/user.routes.js";
import cors from "cors"
import cookieparser from "cookie-parser"

dotenv.config()
dbConnect();

const app = express();
const PORT = process.env.PORT;

app.use(cookieparser());

app.get("/", (req, res) =>{
    res.send("hello");
})

app.use(cors({
    origin: 'http://localhost:5173', // Allow all origins, or specify domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow credentials if necessary
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use("/api/v1/users", router)

app.listen(PORT, ()=>{
    console.log("server is running on 5000")
})