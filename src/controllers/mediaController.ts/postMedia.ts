import { Request, Response } from "express";
import Media from "../../Schema/mediaModel"; // Adjust the import path as needed
interface AuthenticatedRequest extends Request {
  user?: any; // Adjust type according to your schema
}
const createMedia = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { title, content } = req.body;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's information

  try {
    // Validate the input data
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    // Create a new media document
    const newMedia = new Media({
      title,
      content,
      user: userId,
      created: new Date(),
      updated: new Date(),
    });

    // Save the media document to the database
    await newMedia.save();

    // Respond with the created media document
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default createMedia;
