
import path from "path";
import { fileURLToPath } from "url";
import { readJSON } from "../utils/fileStorage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesPath = path.join(__dirname, "../data/profiles.json");
const swipesPath = path.join(__dirname, "../data/swipes.json");

export const getFeed = (req, res) => {
  try {
    const profiles = readJSON(profilesPath);
    const swipes = readJSON(swipesPath);

    // Get IDs of profiles already swiped on
    const swipedProfileIds = new Set(
      swipes.map((swipe) => swipe.profileId)
    );

    // Remove already-swiped profiles
    const feed = profiles
      .filter((profile) => !swipedProfileIds.has(profile.id))
      .map(({ likedYou, ...profile }) => profile);

    return res.status(200).json({
      count: feed.length,
      profiles: feed
    });

  } catch (error) {
    console.error("Feed error:", error);

    return res.status(500).json({
      message: "Could not fetch profiles"
    });
  }
};
