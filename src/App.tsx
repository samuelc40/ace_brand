import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";
import WebsiteDevelopment from "./pages/services/WebsiteDevelopment";
import SecurityAudits from "./pages/services/SecurityAudits";
import SurveillanceCustomization from "./pages/services/SurveillanceCustomization";
import EthicalHackingTraining from "./pages/services/EthicalHackingTraining";
import CaptureTheFlagTraining from "./pages/services/CaptureTheFlagTraining";
import Designing from "./pages/services/Designing";
import ContentWriting from "./pages/services/ContentWriting";
import Projects from "./pages/Projects";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="training" element={<Training />} />
          <Route path="chat" element={<Chat />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services/website-development" element={<WebsiteDevelopment />} />
          <Route path="services/security-audits" element={<SecurityAudits />} />
          <Route path="services/surveillance-customization" element={<SurveillanceCustomization />} />
          <Route path="services/ethical-hacking-training" element={<EthicalHackingTraining />} />
          <Route path="services/capture-the-flag-training" element={<CaptureTheFlagTraining />} />
          <Route path="services/designing" element={<Designing />} />
          <Route path="services/content-writing" element={<ContentWriting />} />
          <Route path="projects" element={<Projects />} />
          <Route path="admin" element={<AdminLogin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
