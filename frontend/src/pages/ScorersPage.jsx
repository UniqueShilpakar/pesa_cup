
import TopScorersList from "../components/TopScorersList";
import scorers from "../data/scorers";

export default function ScorersPage() {
  return (
    <>
      <div className="page-banner">
        <h1>Top Scorers</h1>
        <p>Leading goal scorers of the tournament</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Golden Boot Race</h2>
          <span className="section-line" />
          <p className="section-sub">
            Rankings based on goals scored. Assists used as tiebreaker.
          </p>
          <TopScorersList scorers={scorers} />
        </div>
      </section>
    </>
  );
}