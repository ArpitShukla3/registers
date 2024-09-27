import express from "express";
import createMedia from "../controllers/mediaController.ts/postMedia";
import updateMedia from "../controllers/mediaController.ts/updateMedia";
import { getMediaByUser } from "../controllers/mediaController.ts/readMedia";
import { deleteMedia } from "../controllers/mediaController.ts/deleteController";
import { getPostByID } from "../controllers/mediaController.ts/postByID";
import { filterByDate } from "../controllers/mediaController.ts/filterControllers/filterByDate";
import { searchTitle } from "../controllers/mediaController.ts/filterControllers/searchTitle";
import middleAuth from "../middleware/middleAuth";

const router = express.Router();

// Apply middleAuth middleware to all routes
router.use(middleAuth);

// Create a new media item
router.post("/create", createMedia);
// Update a media item by id
router.post("/update/:id", updateMedia);
// Read all media items
router.get("/read", getMediaByUser);
// Delete a media item by id
router.delete("/delete/:id", deleteMedia);
// Read a single media item by id
router.get("/readSingle/:id", getPostByID);
// Filter media items by date range
router.get("/filterByDate", filterByDate);
// Search media items by title
router.get("/search", searchTitle);

const mediaRouter = router;
export default mediaRouter;