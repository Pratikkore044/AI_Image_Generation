import express from "express";
import { createPosts, getAllPosts } from "../controllers/Posts.js";


const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPosts);

export default router;