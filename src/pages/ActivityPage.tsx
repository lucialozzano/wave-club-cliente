import "../styles/activities.css";

import Header from "../components/Activities/Header";
import ActivityGrid from "../components/ActivityPage/ActivityGrid"; // tu grid de clases
import Levels from "../components/Activities/Levels";
import Teachers from "../components/Activities/Teachers";
import Footer from "../components/Home/Footer";

export default function ActivityPage() {
  return (
    <div className="w-full">
      <Header />
      <Levels />
      <ActivityGrid />
      <Teachers />
      <Footer />
    </div>
  );
}