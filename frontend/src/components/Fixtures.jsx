
import { useState, useEffect } from 'react';
import { FixturesAPI } from '../data/apis/api.fixtures';
import '../css/Fixtures.css';

export default function Fixtures() {
  const [fixturesData, setFixturesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);
        const data = await FixturesAPI.getAllFixtures();
        setFixturesData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load fixtures. Please try again later.');
        console.error('Error loading fixtures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  const upcomingMatches = fixturesData.filter(m => m.status === 'upcoming');
  const finishedMatches = fixturesData.filter(m => m.status === 'finished');

  const MatchCard = ({ match }) => (
    <div className={`match-card ${match.status}`}>
      <div className="match-header">
        <span className="match-date">
          {new Date(match.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
        <span className={`match-status ${match.status}`}>
          {match.status === 'upcoming' ? 'UPCOMING' : 'FINISHED'}
        </span>
      </div>

      <div className="match-body">
        <div className="match-info">
          <div className="team-a">
            <div className="team-name">{match.teamA}</div>
          </div>

          <div className="match-score">
            {match.status === 'finished' ? (
              <>
                <div className="score">{match.scoreA}</div>
                <div className="vs">VS</div>
                <div className="score">{match.scoreB}</div>
              </>
            ) : (
              <div className="vs-upcoming">VS</div>
            )}
          </div>

          <div className="team-b">
            <div className="team-name">{match.teamB}</div>
          </div>
        </div>
      </div>

      <div className="match-footer">
        <span className="match-time">{match.time}</span>
        <span className="match-venue">{match.venue}</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="fixtures" id="features">
        <div className="container">
          <h2 className="section-title">Fixtures</h2>
          <p className="fixtures-subtitle">Loading fixtures...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="fixtures" id="features">
        <div className="container">
          <h2 className="section-title">Fixtures</h2>
          <p className="fixtures-subtitle" style={{ color: 'red' }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="fixtures" id="features">
      <div className="container">
        <h2 className="section-title">Fixtures</h2>
        <p className="fixtures-subtitle">Upcoming match cards and finished games.</p>

        <div className="fixtures-container">

         {/* //upcoming matches
         //------------------------------------------------------- */}
          <div className="fixtures-column">
            <h3 className="column-title upcoming-title">
              <span className="title-badge">Upcoming</span>
            </h3>
            <div className="matches-list">
              {upcomingMatches.length > 0 ? (
                upcomingMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="no-matches">No upcoming matches</div>
              )}
            </div>
          </div>

          {/* //finished matches
          //--------------------------------------------------- */}
          <div className="fixtures-column">
            <h3 className="column-title finished-title">
              <span className="title-badge">Finished</span>
            </h3>
            <div className="matches-list">
              {finishedMatches.length > 0 ? (
                finishedMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="no-matches">No finished matches</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
