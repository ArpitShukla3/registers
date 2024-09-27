import express, { Request, Response } from "express";
import createMedia from "../controllers/mediaController.ts/postMedia";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import middleAuth from "../middleware/middleAuth";
import updateMedia from "../controllers/mediaController.ts/updateMedia";
import { getMediaByUser } from "../controllers/mediaController.ts/readMedia";
import { deleteMedia } from "../controllers/mediaController.ts/deleteController";
import { getPostByID } from "../controllers/mediaController.ts/postByID";
const router = express.Router();

// Mock data
let mediaItems: any[] = [];

// Create a new media item
router.post("/create", middleAuth, createMedia);
// Update a media item by id
router.post("/update/:id", middleAuth, updateMedia);
// Read all media items
router.get("/read", middleAuth,getMediaByUser);
// Delete a media item by id
router.delete("/delete/:id",middleAuth,deleteMedia);
// Read a single media item by id
router.get("/readSingle/:id",middleAuth,getPostByID);


const mediaRouter = router;
export default mediaRouter;
