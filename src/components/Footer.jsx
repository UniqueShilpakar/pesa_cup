
import { Phone, Mail, MapPin,  } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import "../css/Footer.css";


export default function  Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* //about section  */}
            
            <div className="footer-section">
              <h3 className="footer-title">PESA</h3>
              <p className="footer-text">
                Prabhat English Secondary School (PESA CUP) organized by 2076
                Batch.
              </p>
              <div className="footer-social">
                <a href="https://www.facebook.com/groups/139214785116" className="social-link" aria-label="Facebook">
                  <FaFacebook size={20} />
                </a>
             
                {/* <a href="#" className="social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a> */}
              </div>
            </div>
            {/* //contact section
            //------------------------------------------------- */}
            <div className="footer-section">
              <h3 className="footer-title">Contact</h3>
              <ul className="footer-links">
                <li>
                  <MapPin size={18} />
                  <span>
                    Unique Shilpakar
                    <br />
                    Bhaktapur, Byasi-2, Nepal
                  </span>
                </li>
                <li>
                  <Phone size={18} />
                  <span>+977 - 9761626772</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>uniqueshilpakar17@gmail.com</span>
                </li>
              </ul>
            </div>
            {/* //quick links 
            //-------------------------------------------- */}
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#standings">Standings</a>
                </li>
                <li>
                  <a href="#sponsors">Sponsors</a>
                </li>
              </ul>
            </div>
            {/* //info section 
            //-------------------------------------------- */}
            <div className="footer-section">
              <h3 className="footer-title">Social Media Links</h3>
              <p className="footer-text">
                Follow us on social media for live updates and tournament news.
              </p>
              <div className="footer-social-links">
                <a href="https://www.facebook.com/groups/139214785116" className="social-badge">
                  Facebook
                </a>
                <a href="#" className="social-badge">
                  Messenger
                </a>
                {/* <a href="#" className="social-badge">
                  Instagram
                </a> */}
              </div>
            </div>
          </div>

          <div className="social-icons">
  <a
    href="https://www.facebook.com/groups/139214785116"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebook size={22} />
  </a>
</div>
          {/* //footer bottom //--------------------------------------------- */}
          <div className="footer-bottom">
            <p className="copyright">
              &copy; 2026 Prabhat English Secondary School. All rights reserved.
            </p>
            <div className="footer-links-bottom">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
