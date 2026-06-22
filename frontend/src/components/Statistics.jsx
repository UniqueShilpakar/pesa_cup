
import { Users, Activity, Zap, Trophy } from 'lucide-react';
import '../css/Statistics.css';
import { useEffect, useState } from "react";
import { StatisticsAPI } from "../data/apis/api.statistic";

export default function Statistics() {
  const [tournamentData, setTournamentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentStats = async () => {
      try {
        setLoading(true);
        const data = await StatisticsAPI.getTournamentStatistics();
        setTournamentData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tournament statistics.');
        console.error('Error loading tournament statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentStats();
  }, []);

  // Build stats array from API data
  const stats = tournamentData ? [
    {
      icon: Users,
      value: tournamentData.summaryStats?.totalTeams ?? 0,
      label: 'Total Teams',
      color: 'stat-teams'
    },
    {
      icon: Activity,
      value: tournamentData.summaryStats?.totalMatches ?? 0,
      label: 'Total Matches',
      color: 'stat-matches'
    },
    {
      icon: Zap,
      value: tournamentData.summaryStats?.totalGoals ?? 0,
      label: 'Total Goals',
      color: 'stat-goals'
    },
    {
      icon: Trophy,
      value: tournamentData.summaryStats?.topScorer?.goals ?? 0,
      label: `Top Scorer (${tournamentData.summaryStats?.topScorer?.name ?? 'N/A'})`,
      color: 'stat-played'
    }
  ] : [];

  if (loading) {
    return (
      <section className="statistics" id="stats">
        <div className="container">
          <h2 className="section-title">Tournament Statistics</h2>
          <p style={{ textAlign: 'center', color: '#888' }}>Loading statistics...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="statistics" id="stats">
        <div className="container">
          <h2 className="section-title">Tournament Statistics</h2>
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="statistics" id="stats">
      <div className="container">
        <h2 className="section-title">{tournamentData?.name ?? 'Tournament Statistics'}</h2>
        <p className="stats-subtitle">
          {tournamentData?.season && `Season ${tournamentData.season}`}
          {tournamentData?.venue && ` • ${tournamentData.venue}`}
          {tournamentData?.organizer && ` • Organized by ${tournamentData.organizer}`}
        </p>

        <div className="stats-grid">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`stat-card ${stat.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon">
                  <IconComponent size={40} />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
