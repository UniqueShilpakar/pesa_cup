import { useEffect, useMemo, useState } from "react";
import "../css/Standings.css";
import { StandingsAPI } from "../data/apis/api.standings";

const StandingsTable = ({ data }) => (
  <div className="table-wrapper">
    <table className="standings-table">
      <thead>
        <tr>
          <th className="col-pos">Pos</th>
          <th className="col-team">Team</th>
          <th className="col-stat">Played</th>
          <th className="col-stat">Won</th>
          <th className="col-stat">Draw</th>
          <th className="col-stat">Lost</th>
          <th className="col-stat">GF</th>
          <th className="col-stat">GA</th>
          <th className="col-stat">GD</th>
          <th className="col-pts">Pts</th>
        </tr>
      </thead>
      <tbody>
        {data.map((team) => (
          <tr key={team.id ?? `${team.team}-${team.position}`}>
            <td className="col-pos">
              <div className="position-badge">{team.position}</div>
            </td>
            <td className="col-team">{team.team}</td>
            <td className="col-stat">{team.played}</td>
            <td className="col-stat">{team.won}</td>
            <td className="col-stat">{team.draw}</td>
            <td className="col-stat">{team.lost}</td>
            <td className="col-stat">{team.goalFor}</td>
            <td className="col-stat">{team.goalAgainst}</td>
            <td
              className={`col-stat ${
                team.goalDifference > 0
                  ? "positive"
                  : team.goalDifference < 0
                    ? "negative"
                    : ""
              }`}
            >
              {team.goalDifference > 0 ? "+" : ""}
              {team.goalDifference}
            </td>
            <td className="col-pts">
              <span className="points-badge">{team.points}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Standings() {
  const [standings, setStandings] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadStandings = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await StandingsAPI.getAllStandings();
        if (isMounted) {
          setStandings(Array.isArray(data) ? data : []);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError("Unable to load standings from the backend.");
          setStandings([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStandings();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique tournaments
  const tournaments = useMemo(() => {
    const tourneyMap = new Map();
    standings.forEach((item) => {
      if (item.tournament) {
        tourneyMap.set(item.tournament.id, item.tournament.name);
      }
    });
    return Array.from(tourneyMap.entries()).map(([id, name]) => ({ id, name }));
  }, [standings]);

  // Set default selected tournament
  useEffect(() => {
    if (
      tournaments.length > 0 &&
      !tournaments.some((t) => t.id === Number(selectedTournament))
    ) {
      setSelectedTournament(tournaments[0].id);
    }
  }, [tournaments, selectedTournament]);

  // Filter standings for selected tournament
  const currentTournamentStandings = useMemo(() => {
    return standings.filter(
      (item) => item.tournamentId === Number(selectedTournament),
    );
  }, [standings, selectedTournament]);

  // Extract unique groups for the selected tournament
  const groups = useMemo(() => {
    const groupSet = new Set(
      currentTournamentStandings.map((item) => item.group || "Group A"),
    );
    return Array.from(groupSet);
  }, [currentTournamentStandings]);

  // Set default selected group
  useEffect(() => {
    if (groups.length > 0 && !groups.includes(selectedGroup)) {
      setSelectedGroup(groups[0]);
    }
  }, [groups, selectedGroup]);

  // Final table data sorted by position
  const filteredData = useMemo(() => {
    return currentTournamentStandings
      .filter((item) => (item.group || "Group A") === selectedGroup)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [currentTournamentStandings, selectedGroup]);

  return (
    <section className="standings" id="standings">
      <div className="container">
        <h2 className="section-title">Standings</h2>

        {loading && <p>Loading standings from the backend...</p>}
        {!loading && error && <p>{error}</p>}

        {!loading && tournaments.length > 0 && (
          <div className="standings-filters">
            {/* Tournament Selector */}
            <div className="filter-group">
              <label htmlFor="tournament-select">Tournament:</label>
              <select
                id="tournament-select"
                className="filter-select"
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
              >
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Filter Tabs */}
            {groups.length > 0 && (
              <div className="group-tabs">
                {groups.map((group) => (
                  <button
                    key={group}
                    className={`group-tab ${selectedGroup === group ? "active" : ""}`}
                    onClick={() => setSelectedGroup(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="standings-container">
          {!loading && filteredData.length > 0 ? (
            <StandingsTable data={filteredData} />
          ) : !loading ? (
            <p>No standings available.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
