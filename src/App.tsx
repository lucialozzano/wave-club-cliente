import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityPage from "./pages/ActivityPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:activityName" element={<ActivityPage />} />

      </Routes>
    </BrowserRouter>)
}

export default App;
