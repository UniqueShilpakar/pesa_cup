import {type Request, type Response} from 'express';
import galleryService from './gallery.service';

const galleryController = {
    getAllGalleryItems: async (req: Request, res: Response): Promise<void> => {
        const result = await galleryService.getAllCategories();
        res.json(result);
    },
    getGalleryItemById: async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.id;
        const result = await galleryService.getCategoryById(categoryId);
        if (!result) {
            res.status(404).json({error: `Gallery item with id ${categoryId} not found`});
            return;
        }
        res.json(result);
    },
    createGalleryItem: async (req: Request, res: Response): Promise<void> => {
        // Implementation for creating a new gallery item
        res.status(201).json({message: "Gallery item created successfully"});
    },
    updateGalleryItem: async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.id;
        // Implementation for updating a gallery item
        res.json({message: `Gallery item with id ${categoryId} updated successfully`});
    },
    deleteGalleryItem: async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.id;
        // Implementation for deleting a gallery item
        res.json({message: `Gallery item with id ${categoryId} deleted successfully`});
    }
};

export default galleryController;