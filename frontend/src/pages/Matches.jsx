
import { useEffect, useState } from "react";
import { getMatches } from "../services/api";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data.matches);
      } catch (error) {
        console.error("Could not load matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-stone-500">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">
          Your Matches
        </h1>
        <p className="text-stone-500 mt-2">
          People who liked you back.
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-stone-700">
            No matches yet
          </h2>
          <p className="text-stone-500 mt-2">
            Your mutual connections will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matches.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-stone-100"
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full aspect-[4/5] object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-stone-800">
                  {profile.name}, {profile.age}
                </h3>

                <p className="text-sm text-stone-500 mt-1">
                  {profile.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Matches;
