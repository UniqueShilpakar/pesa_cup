import Router,{type Request,type Response}   from "express";
import galleryController from "./gallery.controller.ts";

const gallery = Router();

// GET all gallery items
gallery.get("/", async (req:Request, res:Response) => {
  req.log.info("GET /api/v1/gallery endpoint hit");
  await galleryController.getAllGalleryItems(req, res);
});

// GET gallery item by id
gallery.get("/:id", async (req:Request, res:Response) => {
  req.log.info(`GET /api/v1/gallery/${req.params.id} endpoint hit`);
  await galleryController.getGalleryItemById(req, res);
});

// POST create new gallery item
gallery.post("/", async (req:Request, res:Response) => {
  req.log.info(`POST /api/v1/gallery endpoint hit with body: ${JSON.stringify(req.body)}`);
  await galleryController.createGalleryItem(req, res);
});

// PATCH update gallery item
gallery.patch("/:id", async (req:Request, res:Response) => {
  req.log.info(`PATCH /api/v1/gallery/${req.params.id} endpoint hit with body: ${JSON.stringify(req.body)}`);
  await galleryController.updateGalleryItem(req, res);
});

// DELETE gallery item
gallery.delete("/:id", async (req:Request, res:Response) => {
  req.log.info(`DELETE /api/v1/gallery/${req.params.id} endpoint hit`);
  await galleryController.deleteGalleryItem(req, res);
});

export default gallery;