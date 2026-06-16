import "../css/TopScorersList.css";

const defaultScorers = [
  { rank: 1, name: "Ram Bahadur", team: "Team Alpha", goals: 8, assists: 3, avatar: "RB" },
  { rank: 2, name: "Hari Prasad", team: "Team Beta", goals: 6, assists: 5, avatar: "HP" },
  { rank: 3, name: "Sita Karki", team: "Team Gamma", goals: 5, assists: 2, avatar: "SK" },
  { rank: 4, name: "Bikash Thapa", team: "Team Delta", goals: 3, assists: 4, avatar: "BT" },
  { rank: 5, name: "Anish Gurung", team: "Team Alpha", goals: 2, assists: 6, avatar: "AG" },
];

export default function TopScorersList({ scorers = defaultScorers }) {
  const maxGoals = scorers[0].goals;

  return (
    <section className="scorers-section">
      <h2 className="scorers-heading">Top Scorers</h2>
      <div className="scorers-grid">
        {scorers.map((s, i) => (
          <div className={`scorer-card ${i === 0 ? "first-place" : ""}`} key={s.rank}>

            <span className={`scorer-rank ${i < 3 ? "top" : ""}`}>
              #{s.rank}
            </span>

            <div className={`scorer-avatar ${i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : ""}`}>
              {s.avatar}
            </div>

            <div className="scorer-info">
              <p className="scorer-name">{s.name}</p>
              <p className="scorer-team">{s.team}</p>

              <div className="goal-bar-track">
                <div
                  className="goal-bar-fill"
                  style={{ width: `${Math.round((s.goals / maxGoals) * 100)}%` }}
                />
              </div>

              <div className="scorer-stats">
                <span className="scorer-stat">⚽ <strong>{s.goals}</strong> goals</span>
                <span className="scorer-stat">🎯 <strong>{s.assists}</strong> assists</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}