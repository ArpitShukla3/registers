import { Response } from "express";
import logger from "../../../logger";
import { getMediaByUser } from "../../controllers/mediaController.ts/readMedia";
import Media from "../../Schema/mediaModel";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { log } from "console";

const resolvers = {
    Query: {
        getMediaByUser: async (_: any, __: any, { req }: { req: AuthenticatedRequest }) => {
            try {
                const userId = req.user._id;
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 10;
                const skip = (page - 1) * limit;
                console.log(userId,page,limit,skip);
                const media = await Media.find({ user: userId }).skip(skip).limit(limit).exec();
                const total = await Media.countDocuments({ user: userId });
                return {
                    total,
                    page,
                    limit,
                    media,
                };
            } catch (error) {
                logger.error("Error retrieving media", error);
                throw new Error("Error retrieving media");
            }
           
        },
        getPostByID: async (_: any, { id }: { id: string }, { req }: { req: AuthenticatedRequest }) => {
            try {
                const post = await Media.findById(id);
                if (post?.user != req.user._id) {
                    logger.error('Unauthorized');
                    throw new Error('Unauthorized');
                }
                if (!post) {
                    throw new Error('Post not found');
                }
                return post;
            } catch (error) {
                logger.error('Server error', error);
                throw new Error('Server error');
            }
        },
        searchTitle: async (_: any, { title }: { title: string }) => {
            try {
                const posts = await Media.find({ title: { $regex: title, $options: "i" } });
                return posts;
            } catch (error) {
                logger.error("Server error", error);
                throw new Error("Server error");
            }
        },
        filterByDate: async (_: any, { startDate, endDate }: { startDate: string, endDate: string }, { req }: { req: AuthenticatedRequest }) => {
            try {
                if (!startDate || !endDate) {
                    throw new Error("Start date and end date are required");
                }

                const start = new Date(startDate);
                const end = new Date(endDate);

                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    throw new Error("Invalid date format");
                }

                const mediaPosts = await Media.find({
                    user: req.user._id,
                    createdAt: {
                        $gte: start,
                        $lte: end,
                    },
                }).exec();

                return mediaPosts;
            } catch (error) {
                logger.error("Server error", error);
                throw new Error("Server error");
            }
        },
    },
    Mutation: {
        createMedia: async (_: any, { title, content }: { title: string, content: string }, { req }: { req: AuthenticatedRequest }) => {
            try {
                if (!title || !content) {
                    throw new Error("Title and content are required");
                }
                const userId = req.user._id.toString();
                console.log(req.user._id);
                const newMedia = new Media({
                    title,
                    content,
                    user: userId,
                    created: new Date(),
                    updated: new Date(),
                });

                await newMedia.save();
                return newMedia;
            } catch (error) {
                logger.error("Server error", error);
                throw new Error("Server error");
            }
        },
        updateMedia: async (_: any, { id, title, content }: { id: string, title: string, content: string }, { req }: { req: AuthenticatedRequest }) => {
            try {
                if (!title || !content) {
                    throw new Error("Title and content are required");
                }

                const media = await Media.findOne({ _id: id, user: req.user._id });

                if (!media) {
                    throw new Error("Media not found");
                }

                media.title = title;
                media.content = content;
                media.updated = new Date();

                await media.save();
                return media;
            } catch (error) {
                logger.error("Server error", error);
                throw new Error("Server error");
            }
        },
        deleteMedia: async (_: any, { id }: { id: string }) => {
            try {
                const media = await Media.findByIdAndDelete(id);
                console.log(media,id);
                if (!media) {
                    throw new Error('Media not found');
                }

                logger.info('Media deleted successfully');
                return { message: 'Media deleted successfully' };
            } catch (error) {

                logger.error('Server error', error);
                throw new Error('Server error');
            }
        },
    },
};
const mediaResolvers = resolvers;
export default mediaResolvers;