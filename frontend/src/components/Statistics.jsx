
import { Users, Activity, Target, Zap } from 'lucide-react';
import '../css/Statistics.css';

export default function Statistics() {
  const stats = [
    {
      icon: Users,
      value: 16,
      label: 'Total Teams',
      color: 'stat-teams'
    },
    {
      icon: Activity,
      value: 32,
      label: 'Total Matches',
      color: 'stat-matches'
    },
    {
      icon: Target,
      value: 28,
      label: 'Matches Played',
      color: 'stat-played'
    },
    {
      icon: Zap,
      value: 85,
      label: 'Total Goals',
      color: 'stat-goals'
    }
  ];

  return (
    <section className="statistics" id="stats">
      <div className="container">
        <h2 className="section-title">Tournament Statistics</h2>
        
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
