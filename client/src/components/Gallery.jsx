import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Gallery.css";

import photo1 from "../assets/Gallery/1.jpg";
import photo2 from "../assets/Gallery/2.jpg";
import photo3 from "../assets/Gallery/3.jpg";
import photo4 from "../assets/Gallery/4.jpg";
import photo5 from "../assets/Gallery/5.jpg";
import photo6 from "../assets/Gallery/6.jpg";
import photoBack from "../assets/Gallery/back.jpg";
import photoTeam from "../assets/Gallery/team.jpg";

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
  "Trophy Celebration": {
    label: "Celebrations",
    description: "Trophy Celebrations",
    photos: [
      { id: 8, src: photo4, caption: "Trophy Celebration" },
    ],
  },
};


export default function GalleryPage(){
  const {categoryId} = useParams();
  const navigate = useNavigate();
  const {Lightbox, setLightbox} = useState(null);

  const category = categories[categoryId];

  if(!category){
    return(
      <div className="gallery-page-error">
        <p>Category not found</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }
const photos = categories.photos;
const setLightboxIndex = photos.findIndex(p => p.id === lightbox?.id);

}


