
import { useEffect, useState } from "react";
import { Heart, X} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFeed, swipeProfile } from "../services/api";
import ProfileCard from "../components/Profilecard";

function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [match, setMatch] = useState(null);
  const [swiping, setSwiping] = useState(false);

 const fetchProfiles = async () => {
        try {
        setError("");
        const data = await getFeed();
        setProfiles(data.profiles);
    } catch {
        setError("Unable to load profiles. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSwipe = async (action) => {
    if (swiping || !profiles.length) return;

    setSwiping(true);
    const currentProfile = profiles[0];

    try {
      const result = await swipeProfile(currentProfile.id, action);

      setProfiles((prev) =>
        prev.filter((profile) => profile.id !== currentProfile.id)
      );

      if (result.isMatch) {
        setMatch(currentProfile);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Swipe failed. Please try again."
      );
    } finally {
      setSwiping(false);
    }
  };

  if (loading) {
    return <p className="py-20 text-center text-[#777769]">Loading profiles...</p>;
  }

  if (error && profiles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-[#777769]">{error}</p>
        <button
          onClick={fetchProfiles}
          className="rounded-full bg-[#414832] px-6 py-2 text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
   <section className="mx-auto min-h-[calc(100dvh-80px)] max-w-6xl px-4 pt-6 pb-8 md:px-6 md:py-10">
      <div className="mb-5 text-center md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black">
          A little connection goes a long way
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl tracking-tight text-pink-600">
          Discover
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Find your kind of people.
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="mx-auto max-w-md rounded-3xl border border-[#e9e6dd] bg-white p-12 text-center">
          <Heart size={38} className="mx-auto text-black" />
          <h2 className="mt-5 text-xl font-semibold text-black">
            You've seen everyone!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You've explored all available profiles. Check back later!
          </p>
        </div>
      ) : (
        <>
          <div className="relative mx-auto w-full max-w-[390px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={profiles[0].id}
                drag={!swiping ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 120) handleSwipe("like");
                  else if (info.offset.x < -120) handleSwipe("pass");
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 250 }}
                transition={{ duration: 0.25 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <ProfileCard profile={profiles[0]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 md:mt-8 md:gap-7">
            <button
              disabled={swiping}
              onClick={() => handleSwipe("pass")}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e8d8d1] bg-white text-black shadow-md transition hover:scale-110 hover:bg-[#fcf3ef] disabled:opacity-50"
              aria-label="Pass"
            >
              <X size={30} />
            </button>

            <button
              disabled={swiping}
              onClick={() => handleSwipe("like")}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-black shadow-md transition hover:scale-110 hover:bg-pink-500 disabled:opacity-50"
              aria-label="Like"
            >
              <Heart size={27} />
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-gray-500 md:mt-6">
            Swipe right to like · Swipe left to pass
          </p>
        </>
      )}

      <AnimatePresence>
        {match && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm rounded-[32px] bg-[#f8f7f4] p-9 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8eadd] text-[#414832]">
                <Heart size={38} fill="pink" />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-black">
                It's a match!
              </h2>

              <p className="mt-3 text-sm text-gray-600">
                You and {match.name} liked each other.
              </p>

              <button
                onClick={() => setMatch(null)}
                className="mt-8 w-full rounded-full bg-pink-600 py-3.5 font-medium text-black transition hover:bg-pink-500"
              >
                Keep discovering
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Discover;
