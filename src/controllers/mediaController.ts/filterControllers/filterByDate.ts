import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../types/AuthenticatedRequest";
import Media from "../../../Schema/mediaModel";
export const filterByDate = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ message: "Start date and end date are required" });
      return;
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({ message: "Invalid date format" });
      return;
    }

    const mediaPosts = await Media.find({
      user: req.user._id,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).exec();

    res.status(200).json(mediaPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
