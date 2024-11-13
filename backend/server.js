import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: "http://localhost:5173", // replace with your React app's URL
  }));

app.get("/",(req,res)=>{
    res.send("Server is Running");
});

app.use(express.json()); // allows us to accept json data in the req.body


app.use("/api/products",productRoutes);

app.listen(PORT,(req,res)=>{
    ConnectDb();
    console.log(`server is running on port ${PORT}`);
});




