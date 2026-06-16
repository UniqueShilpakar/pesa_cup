
import '../css/Sponsors.css';

export default function Sponsors() {
  const sponsors = [
    //can be assign manually
    //-------------------------------------------------------------
    { id: 1, name: 'Corporate Sponsor 1', color: '#FF6B6B' },
    { id: 2, name: 'Corporate Sponsor 2', color: '#4ECDC4' },
    { id: 3, name: 'Company', color: '#45B7D1' },
    { id: 4, name: 'Organization', color: '#96CEB4' }
  ];

  return (
    <section className="sponsors" id="sponsors">
      <div className="container">
        <h2 className="section-title">Sponsors</h2>

        <div className="sponsors-grid">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className="sponsor-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="sponsor-logo"
                style={{ backgroundColor: sponsor.color }}
              >
                <span className="logo-text">{sponsor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}