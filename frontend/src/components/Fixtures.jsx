import { useEffect, useState } from "react";
import "../css/Fixtures.css";
import { FixturesAPI } from "../data/apis/api.fixtures";

// Helper function to format date cleanly
const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("T")[0].split("-");
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Helper function to convert Date and Time into a timestamp
const getMatchTimestamp = (dateStr, timeStr) => {
  if (!dateStr) return 0;
  const dateOnly = dateStr.split("T")[0];
  return (
    new Date(`${dateOnly} ${timeStr || ""}`).getTime() ||
    new Date(dateOnly).getTime()
  );
};

// Extracted MatchCard to prevent unnecessary re-creation on render
const MatchCard = ({ match }) => {
  const currentStatus = match.status?.toLowerCase() || "";
  const isPlayedOrLive =
    currentStatus === "finished" || currentStatus === "live";

  const homeName = match.teamA || match.homeTeam?.name || "TBD";
  const awayName = match.teamB || match.awayTeam?.name || "TBD";

  return (
    <div className={`match-card ${currentStatus}`}>
      <div className="match-header">
        <span className="match-date">{formatDate(match.date)}</span>
        <span className={`match-status ${currentStatus}`}>
          {currentStatus.toUpperCase()}
        </span>
      </div>

      <div className="match-body">
        <div className="match-info">
          <div className="team-a">
            <div className="team-name">{homeName}</div>
          </div>

          <div className="match-score">
            {isPlayedOrLive ? (
              <>
                <div className="score">{match.scoreA ?? 0}</div>
                <div className="vs">VS</div>
                <div className="score">{match.scoreB ?? 0}</div>
              </>
            ) : (
              <div className="vs-upcoming">VS</div>
            )}
          </div>

          <div className="team-b">
            <div className="team-name">{awayName}</div>
          </div>
        </div>
      </div>

      <div className="match-footer">
        <span className="match-time">{match.time}</span>
        <span className="match-venue">{match.venue}</span>
      </div>
    </div>
  );
};

export default function Fixtures() {
  const [fixturesData, setFixturesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Initial REST API load for static/existing fixtures
  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);
        const data = await FixturesAPI.getAllFixtures();
        setFixturesData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load fixtures. Please try again later.");
        console.error("Error loading fixtures:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  // 2. Real-time Live Score SSE Connection
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/v1/fixtures/live-score",
    );

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === "SCORE_UPDATE" && payload.data) {
          const { fixtureId, homescore, awayscore, status } = payload.data;

          setFixturesData((prevFixtures) =>
            prevFixtures.map((match) => {
              if (match.id === fixtureId || match._id === fixtureId) {
                return {
                  ...match,
                  scoreA: homescore,
                  scoreB: awayscore,
                  status: status ? status.toLowerCase() : match.status,
                };
              }
              return match;
            }),
          );
        }
      } catch (err) {
        console.error("Error parsing live score stream:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Live score SSE error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Filter and sort categories chronologically
  const liveMatches = fixturesData
    .filter((m) => m.status?.toLowerCase() === "live")
    .sort(
      (a, b) =>
        getMatchTimestamp(a.date, a.time) - getMatchTimestamp(b.date, b.time),
    );

  const upcomingMatches = fixturesData
    .filter((m) => m.status?.toLowerCase() === "upcoming")
    .sort(
      (a, b) =>
        getMatchTimestamp(a.date, a.time) - getMatchTimestamp(b.date, b.time),
    );

  const finishedMatches = fixturesData
    .filter((m) => m.status?.toLowerCase() === "finished")
    .sort(
      (a, b) =>
        getMatchTimestamp(b.date, b.time) - getMatchTimestamp(a.date, a.time),
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
          <p className="fixtures-subtitle" style={{ color: "red" }}>
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="fixtures" id="features">
      <div className="container">
        <h2 className="section-title">Fixtures</h2>
        <p className="fixtures-subtitle">
          Live match updates, upcoming cards, and finished games.
        </p>

        <div className="fixtures-container">
          {/* Live Matches Column */}
          {liveMatches.length > 0 && (
            <div className="fixtures-column">
              <h3 className="column-title live-title">
                <span className="title-badge live">Live Now</span>
              </h3>
              <div className="matches-list">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id || match._id} match={match} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Matches Column */}
          <div className="fixtures-column">
            <h3 className="column-title upcoming-title">
              <span className="title-badge">Upcoming</span>
            </h3>
            <div className="matches-list">
              {upcomingMatches.length > 0 ? (
                upcomingMatches.map((match) => (
                  <MatchCard key={match.id || match._id} match={match} />
                ))
              ) : (
                <div className="no-matches">No upcoming matches</div>
              )}
            </div>
          </div>

          {/* Finished Matches Column */}
          <div className="fixtures-column">
            <h3 className="column-title finished-title">
              <span className="title-badge">Finished</span>
            </h3>
            <div className="matches-list">
              {finishedMatches.length > 0 ? (
                finishedMatches.map((match) => (
                  <MatchCard key={match.id || match._id} match={match} />
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
