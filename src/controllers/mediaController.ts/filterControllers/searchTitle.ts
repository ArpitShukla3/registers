import { Request, Response } from "express";
import Media from "../../../Schema/mediaModel";
export const searchTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.query;

  if (!title) {
    res.status(400).json({ message: "Title query parameter is required" });
    return
  }

  try {
    const posts = await Media.find({ title: { $regex: title, $options: "i" } });
    res.status(200).json(posts);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};
