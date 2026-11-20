
import path from "path";
import { fileURLToPath } from "url";
import { readJSON } from "../utils/fileStorage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesPath = path.join(__dirname, "../data/profiles.json");
const swipesPath = path.join(__dirname, "../data/swipes.json");

export const getMatches = (req, res) => {
  try {
    const profiles = readJSON(profilesPath);
    const swipes = readJSON(swipesPath);

    // Get profiles that the logged-in user liked
    const likedProfileIds = new Set(
      swipes
        .filter((swipe) => swipe.action === "like")
        .map((swipe) => swipe.profileId)
    );

    // A match exists only when both users liked each other
    const matches = profiles
      .filter(
        (profile) =>
          likedProfileIds.has(profile.id) &&
          profile.likedYou === true
      )
      .map(({ likedYou, ...profile }) => profile);

    return res.status(200).json({
      count: matches.length,
      matches
    });

  } catch (error) {
    console.error("Matches error:", error);

    return res.status(500).json({
      message: "Could not fetch matches"
    });
  }
};
