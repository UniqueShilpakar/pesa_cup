import { useState } from "react";
import "./Pages.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with the tournament organizers.</p>
      </div>

      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <strong>Email: </strong>
              <p>uniqueshilpakar17@gmail.com</p>
            </div>
            <div className="info-item">
              <strong>Phone: </strong>
              <p>977-9761626772</p>
            </div>
            <div className="info-item">
              <strong>Address: </strong>
              <p>
                Prabhat English Secondary School <br /> Byasi-2, Bhaktapur,
                Nepal
              </p>
            </div>
            <div className="info-item">
              <strong>Hours:</strong>
              <p>
                Monday - Friday: 9:00 AM - 5:00 PM
                <br />
                Saturday: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
