import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js"

dotenv.config(); 


const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
};

app.get("/", async (req, res) => {
    res.status(200).json({ message: "hello" });
});


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    console.error(`Error: ${message}`);
    res.status(status).json({
        success: false,
        status,
        message,
    });
});

const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(8080, () => console.log("🚀 Server running on port 8080"));
    } catch (error) {
        console.error("❌ Server startup failed:", error.message);
    }
};

startServer();
