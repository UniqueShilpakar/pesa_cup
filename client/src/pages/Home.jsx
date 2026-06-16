import Hero from '../components/Hero';
import Fixtures from '../components/Fixtures';
import StandingsSection from '../components/Standings';
import Statistics from '../components/Statistics';
import Sponsors from '../components/Sponsors';
import TopScorersList from '../components/TopScorersList';
import Footer from '../components/Footer';
import Gallary from '../components/Gallery';

export default function Home() {
  return (
    <div>
      <Hero />
      <Fixtures />
      <StandingsSection />
      <TopScorersList/>
      <Statistics />
      <Gallary/>
      <Sponsors />
      <Footer/>
    </div>
  );
}