import "../styles/activities.css";

import Header from "../components/Activities/Header";
import Hero from "../components/Activities/Hero";
import Grid from "../components/Activities/Grid";
import Testimonials from "../components/Activities/Testimonials";
import Teaching from "../components/Activities/Teaching";
import RRSSGrid from "../components/Activities/RRSSGrid";
import Footer from "../components/Home/Footer";

export default function Activities() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Grid />
      <Testimonials />
      <Teaching />
      <RRSSGrid />
      <Footer />
    </div>
  );
}