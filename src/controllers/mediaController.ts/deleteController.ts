import { Request, Response } from 'express';
import Media from '../../Schema/mediaModel';
import logger from '../../../logger';
export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const mediaId = req.params.id;
        const media = await Media.findByIdAndDelete(mediaId);

        if (!media) {
            res.status(404).json({ message: 'Media not found' });
            return;
        }
        logger.info('Media deleted successfully');
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        logger.error('Server error', error);
        res.status(500).json({ message: 'Server error', error });
    }
};