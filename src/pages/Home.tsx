import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import ActivitiesGrid from "../components/Home/ActivityGrid";
import Footer from "../components/Home/Footer";
import Parallax from "../components/Home/Parallax";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ActivitiesGrid />
      <Parallax />
      <Footer />
    </>
  );
}
