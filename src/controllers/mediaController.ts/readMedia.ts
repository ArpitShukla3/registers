import { Request, Response } from "express";
import Media from "../../Schema/mediaModel";
import { log } from "console";
import logger from "../../../logger";
interface AuthenticatedRequest extends Request {
  user?: any; // Adjust type according to your schema
}

export const getMediaByUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user && req.user._id; // Assuming req.user is populated with the authenticated user's data

    // Extract pagination parameters from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Find media documents with pagination
    const media = await Media.find({ user: userId })
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total count of media documents for the user
    const total = await Media.countDocuments({ user: userId });

    // Respond with paginated results and total count
    res.status(200).json({
      total,
      page,
      limit,
      media,
    });
  } catch (error) {
    logger.error("Error retrieving media", error);
    res.status(500).json({ message: "Error retrieving media", error });
  }
};