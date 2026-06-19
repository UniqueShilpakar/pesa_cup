import {GalleryRepository} from './gallery.repository';
import {z} from "zod";
import {GalleryCategorySchema, GalleryPhotoSchema} from "./gallery.schema";

type GalleryCategory = z.infer<typeof GalleryCategorySchema>;
type GalleryPhoto = z.infer<typeof GalleryPhotoSchema>;

const repository = new GalleryRepository();

const galleryService = {
    getAllCategories: async (): Promise<GalleryCategory[]> => {
        return repository.getAllCategories();
    },
    getCategoryById: async (categoryId: string): Promise<GalleryCategory | null> => {
        return repository.getCategoryById(categoryId);
    },
    getPhotosByCategoryId: async (categoryId: string): Promise<GalleryPhoto[]> => {
        return repository.getPhotosByCategoryId(categoryId);
    }
};

export default galleryService;