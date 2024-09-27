import { Request, Response } from "express";
import Media from "../../Schema/mediaModel"; // Adjust the import path as needed
import logger from "../../../logger";
interface AuthenticatedRequest extends Request {
  user?: any; // Adjust type according to your schema
}

const updateMedia = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's information

  try {
    // Validate the input data
    if (!title || !content) {
      logger.warn("Title and content are required");
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    // Find the media document by ID and user ID
    const media = await Media.findOne({ _id: id, user: userId });

    if (!media) {
      logger.warn("Media not found");
      res.status(404).json({ message: "Media not found" });
      return;
    }

    // Update the media document
    media.title = title;
    media.content = content;
    media.updated = new Date();

    // Save the updated media document to the database
    await media.save();

    // Respond with the updated media document
    res.status(200).json(media);
  } catch (error) {
    logger.error("Server error", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default updateMedia;
