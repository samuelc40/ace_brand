import Navbar from "./Navbar";
import Footer from "./Footer";
import CompanyLogo from "../assets/company-logo-bg.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-black text-white font-sans selection:bg-cyber-green selection:text-black relative">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src={CompanyLogo}
          alt="Background Logo"
          className="w-[80vw] md:w-[60vw] lg:w-[40vw] object-contain opacity-[0.27] filter blur-[3px] brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] select-none animate-pulse-slow"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Outlet /> {/* ✅ THIS IS THE KEY */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
