import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Gallery.css";

import photo1 from "../assets/Gallary/1.jpg";
import photo2 from "../assets/Gallary/2.jpg";
import photo3 from "../assets/Gallary/3.jpg";
import photo4 from "../assets/Gallary/4.jpg";
import photo5 from "../assets/Gallary/5.jpg";
import photo6 from "../assets/Gallary/6.jpg";
import photoBack from "../assets/Gallary/back.jpg";
import photoTeam from "../assets/Gallary/team.jpg";

const categories = {
  match: {
    label: "Match Photos",
    description: "Action shots from the tournament",
    photos: [
      { id: 1, src: photo1, caption: "Match Highlights" },
      { id: 2, src: photo2, caption: "Match Highlights" },
      { id: 3, src: photo3, caption: "Match Highlights" },
      { id: 4, src: photo4, caption: "Match Highlights" },
      { id: 5, src: photo5, caption: "Match Highlights" },
      { id: 6, src: photo6, caption: "Match Highlights" },
    ],
  },

  team: {
    label: "Team Photos",
    description: "Participated team photos only",
    photos: [
      { id: 7, src: photoTeam, caption: "Meet our participated Teams" },
    ],
  },

  celebration: {        
    label: "Celebrations",
    description: "Trophy Celebrations",
    photos: [
      { id: 8, src: photoBack, caption: "Trophy Celebration" },
    ],
  },
};
export default function GalleryPage() {
  const { categoryId } = useParams();
 
console.log("categoryId from URL:", categoryId);
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);

  const category = categories[categoryId];

  if (!category) {
    return (
      <div className="gallery-page-error">
        <p>Category not found</p>
        <button onClick={() => navigate("/")}>
          ← Go Back
        </button>
      </div>
    );
  }

  const photos = category.photos;
  const lightboxIndex = photos.findIndex(
    (p) => p.id === lightbox?.id
  );

  const goPrev = (e) => {
    e.stopPropagation();
    const prev =
      (lightboxIndex - 1 + photos.length) % photos.length;
    setLightbox(photos[prev]);
  };

  const goNext = (e) => {
    e.stopPropagation();
    const next = (lightboxIndex + 1) % photos.length;
    setLightbox(photos[next]);
  };

  return (
    <div className="gallery-page">

      {/* Header */}
      <div className="gallery-page-header">
        <button
          className="gallery-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back to Gallery
        </button>

        <div>
          <h2 className="gallery-page-title">
            {category.label}
          </h2>
          <p className="gallery-page-desc">
            {category.description}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="gallery-page-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => setLightbox(photo)}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="gallery-img"
            />
            <div className="gallery-caption">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>

            <button className="lightbox-nav prev" onClick={goPrev}>
              ←
            </button>

            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="lightbox-img"
            />

            <button className="lightbox-nav next" onClick={goNext}>
              →
            </button>

            <p className="lightbox-caption">
              {lightbox.caption}
              <span className="lightbox-counter">
                {" "}
                {lightboxIndex + 1} / {photos.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}