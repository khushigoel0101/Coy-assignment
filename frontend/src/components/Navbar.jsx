
import { Heart, Compass , HomeIcon} from "lucide-react";

function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "discover", label: "Discover", Icon: Compass },
  { id: "matches", label: "Matches", Icon: Heart },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-40 border-b border-[#e9e6dd] bg-[#f8f7f4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#414832]">
            coy<span className="text-pink-500">.</span>
          </h1>

          <div className="flex gap-2">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  activeTab === id
                    ? "bg-pink-500 text-black"
                    : "text-black hover:bg-pink-100"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#e9e6dd] bg-[#f8f7f4]/95 backdrop-blur">
        <div className="flex items-center justify-around px-6 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex min-w-20 flex-col items-center gap-1 text-xs font-medium transition ${
                activeTab === id
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <Icon size={22} strokeWidth={activeTab === id ? 2.5 : 1.8} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
