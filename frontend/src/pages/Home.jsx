import { Home as HomeIcon, Heart, Compass } from "lucide-react";

function Home({ setActiveTab }) {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#bd7955]">
          Welcome to coy.
        </p>

        <h1 className="mt-5 text-4xl font-bold text-[#414832]">
          Find your kind of people.
        </h1>

        <p className="mt-4 leading-relaxed text-[#777769]">
          Discover new people, explore shared interests,
          and find meaningful connections.
        </p>

        <button
          onClick={() => setActiveTab("discover")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#414832] px-7 py-3.5 font-medium text-white transition hover:bg-[#343b28]"
        >
          <Compass size={18} />
          Start discovering
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#99988c]">
          <Heart size={15} />
          Connections start here.
        </div>
      </div>
    </section>
  );
}

export default Home;
