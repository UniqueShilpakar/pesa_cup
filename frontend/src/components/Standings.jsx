import { useState } from "react";
import { standingsData } from "../data/standings";
import "../css/Standings.css";

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
          <tr key={team.position}>
            <td className="col-pos">
              <div className="position-badge">
                {team.position}
              </div>
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
              <span className="points-badge">
                {team.points}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function StandingsSection() {
  const [activeGroup, setActiveGroup] = useState("groupA");

  const groups = [
    {
      id: "groupA",
      label: "GROUP A",
      data: standingsData.groupA,
    },
    {
      id: "groupB",
      label: "GROUP B",
      data: standingsData.groupB,
    },
    {
      id: "groupC",
      label: "GROUP C",
      data: standingsData.groupC,
    },
    {
      id: "groupD",
      label: "GROUP D",
      data: standingsData.groupD,
    },
  ];

  const currentGroup =
    groups.find((g) => g.id === activeGroup) || groups[0];

  return (
    <section className="standings" id="standings">
      <div className="container">
        <h2 className="section-title">Standings</h2>

        <div className="group-tabs">
          {groups.map((group) => (
            <button
              key={group.id}
              className={`group-tab ${
                activeGroup === group.id ? "active" : ""
              }`}
              onClick={() => setActiveGroup(group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="standings-container">
          <h3 className="group-title">
            {currentGroup.label}
          </h3>

          <StandingsTable data={currentGroup.data} />
        </div>
      </div>
    </section>
  );
}