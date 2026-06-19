import {z} from "zod";
import dbSession from "../../config/database.ts";
import {GalleryCategorySchema, GalleryPhotoSchema} from "./gallery.schema";

type GalleryCategory = z.infer<typeof GalleryCategorySchema>;
type GalleryPhoto = z.infer<typeof GalleryPhotoSchema>;

export class GalleryRepository {
    async getAllCategories(): Promise<GalleryCategory[]> {
        return dbSession.query<GalleryCategory>("SELECT * FROM gallery_categories");
    }
    async getCategoryById(categoryId: string): Promise<GalleryCategory | null> {
        const categories = await dbSession.query<GalleryCategory>(
            "SELECT * FROM gallery_categories WHERE id = ?",
            [categoryId]
        );
        return categories?.[0] ?? null;
    }
    async getPhotosByCategoryId(categoryId: string): Promise<GalleryPhoto[]> {
        return dbSession.query<GalleryPhoto>(
            "SELECT * FROM gallery_photos WHERE category_id = ? ORDER BY sort_order ASC",
            [categoryId]
        );
    }
}