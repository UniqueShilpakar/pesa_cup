import { useParams, useNavigate } from "react-router-dom";
import "../css/Gallery.css";

import photo1 from "../assets/Gallery/1.jpg";
import photo4 from "../assets/Gallery/4.jpg";
import photoTeam from "../assets/Gallery/team.jpg";

const categories = [
  {
    id: "match",
    label: "Match Photos",
    cover: photo1,
    description: "Action shots from the tournament",
    count: 6,
  },
  {
    id: "team",
    label: "Team Photos",
    cover: photoTeam,
    description: "Participated team photos only",
    count: 1,
  },
  {
    id: "celebration",
    label: "Celebrations",
    cover: photo4,
    description: "Trophy Celebrations",
    count: 1,
  },
];

export default function Gallery() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === categoryId);

  if (categoryId && !category) {
    return (
      <div className="gallery-page-error">
        <p>Category not found</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="gallery-landing">
      <div className="gallery-hero">
        <h1 className="gallery-hero-title">Gallery</h1>
        <p className="gallery-hero-sub">Tournament moments and highlights</p>
        <div className="gallery-hero-line" />
      </div>

      <div className="gallery-categories">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="gcat-card"
            onClick={() => navigate(`/gallery/${cat.id}`)}
          >
            <div className="gcat-img-wrap">
              <img src={cat.cover} alt={cat.label} className="gcat-img" />
              <div className="gcat-img-overlay" />
            </div>
            <div className="gcat-body">
              <span className="gcat-number">0{i + 1}</span>
              <h3 className="gcat-label">{cat.label}</h3>
              <p className="gcat-desc">{cat.description}</p>
              <div className="gcat-footer">
                <span className="gcat-count">{cat.count} photos</span>
                <span className="gcat-arrow">VIEW →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}