import API_BASE_URL from "./config";

const galleryEndpoint = `${API_BASE_URL}/gallery`;
export const GalleryAPI = {
  async getGallery() {
    const response = await fetch(galleryEndpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch gallery");
    }
		return await response.json();
  },
};
