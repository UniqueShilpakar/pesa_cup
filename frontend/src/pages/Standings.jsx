import Footer from "../components/Footer";
import Header from "../components/Header";
import Standings from "../components/Standings";

export default function StandingsPage() {
  return (
    <div>
      <Header />
      <main>
        <Standings />
      </main>
      <Footer />
    </div>
  );
}
