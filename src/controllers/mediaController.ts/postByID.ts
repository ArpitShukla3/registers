import { Request, Response } from 'express';
import Media from '../../Schema/mediaModel';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
export const getPostByID = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const postId = req.params.id;

    try {
        const post = await Media.findById(postId);
        if(post?.user != req.user._id) {
            console.log(post?.user, req.user._id);
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};