import { Request, Response } from 'express';
import Media from '../../Schema/mediaModel';
export const getPostByID = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;

    try {
        const post = await Media.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};