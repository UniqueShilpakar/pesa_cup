// - GalleryCategory: id, label, description, cover image, photo count
// - GalleryPhoto: category id, caption, image path, sort order
// - ContactMessage: name, email, subject, message, createdAt, status

import { z } from "zod";

export const GalleryCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  photoCount: z.number().default(0),
});

export const GalleryPhotoSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  caption: z.string().optional(),
  imagePath: z.string(),
  sortOrder: z.number().default(0),
});

