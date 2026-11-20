
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="pb-24 md:pb-0">
        {activeTab === "home" && (
          <Home setActiveTab={setActiveTab} />
        )}

        {activeTab === "discover" && <Discover />}

        {activeTab === "matches" && <Matches />}
      </main>
    </div>
  );
}

export default App;
