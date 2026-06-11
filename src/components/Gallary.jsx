import { useState } from "react";
import "../css/Gallery.css";

import photo1 from "../assets/Gallary/1.jpg";
import photo2 from "../assets/Gallary/2.jpg";
import photo3 from "../assets/Gallary/3.jpg";
import photo4 from "../assets/Gallary/4.jpg";
import photo5 from "../assets/Gallary/5.jpg";
import photo6 from "../assets/Gallary/6.jpg";
import photoBack from "../assets/Gallary/back.jpg";
import photoTeam from "../assets/Gallary/team.jpg";

const allPhotos = [
  { id: 1, src: photo1, caption: "Match Highlights", category: "match" },
  { id: 2, src: photo2, caption: "Match Highlights", category: "match" },
  { id: 3, src: photo3, caption: "Match Highlights", category: "match" },
  { id: 4, src: photo4, caption: "Match Highlights", category: "match" },
  { id: 5, src: photo5, caption: "Match Highlights", category: "match" },
  { id: 6, src: photo6, caption: "Match Highlights", category: "match" },
  { id: 7, src: photoBack, caption: "Tournament Background", category: "event" },
  { id: 8, src: photoTeam, caption: "Team Photo", category: "team" },
];

const categories = ["all", "match", "team", "event"];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? allPhotos
    : allPhotos.filter(p => p.category === activeCategory);

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-heading">Gallery</h2>
      <p className="gallery-subheading">Moments from the tournament</p>

      {/* Filter Tabs */}
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map((photo) => (
          <div
            className="gallery-item"
            key={photo.id}
            onClick={() => setSelected(photo)}
          >
            <img src={photo.src} alt={photo.caption} className="gallery-img" />
            <div className="gallery-caption">{photo.caption}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
            <img src={selected.src} alt={selected.caption} className="lightbox-img" />
            <p className="lightbox-caption">{selected.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}