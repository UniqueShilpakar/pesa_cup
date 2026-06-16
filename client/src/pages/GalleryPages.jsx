import { useNavigate } from "react-router-dom";
import "../css/Gallery.css";


import photo1 from "../assets/Gallary/1.jpg";
import photo4 from "../assets/Gallary/4.jpg";
import photoTeam from "../assets/Gallary/team.jpg";

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
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <div className="gallery-page-header">
        <h1 className="gallery-page-title">Gallery</h1>
        <p className="gallery-page-desc">Tournament moments and highlights</p>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => navigate(`/gallery/${cat.id}`)}
          >
            <img src={cat.cover} alt={cat.label} className="category-cover" />
            <div className="category-overlay">
              <p className="category-label">{cat.label}</p>
              <p className="category-count">{cat.count} photos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}