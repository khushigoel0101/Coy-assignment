
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesPath = path.join(__dirname, "../data/profiles.json");
const swipesPath = path.join(__dirname, "../data/swipes.json");

export const getMatches = (req, res) => {
  try {
    const profiles = JSON.parse(
      fs.readFileSync(profilesPath, "utf-8")
    );

    const swipes = JSON.parse(
      fs.readFileSync(swipesPath, "utf-8")
    );

    // Find profiles that the user has liked
    const likedProfileIds = swipes
      .filter((swipe) => swipe.action === "like")
      .map((swipe) => swipe.profileId);

    // Mutual likes are the only matches
    const matches = profiles
      .filter(
        (profile) =>
          likedProfileIds.includes(profile.id) &&
          profile.likedYou === true
      )
      .map(({ likedYou, ...profile }) => profile);

    res.status(200).json(matches);

  } catch (error) {
    console.error("Matches error:", error);
    res.status(500).json({
      message: "Could not load matches"
    });
  }
};
