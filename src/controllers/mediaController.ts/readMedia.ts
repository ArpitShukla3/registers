import { Request, Response } from "express";
import Media from "../../Schema/mediaModel";
import { log } from "console";
interface AuthenticatedRequest extends Request {
  user?: any; // Adjust type according to your schema
}

export const getMediaByUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    
    const userId = req.user && req.user._id; // Assuming req.user is populated with the authenticated user's data

    const media = await Media.find({ user: userId }).exec();
    console.log(media);
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving media", error });
  }
};
