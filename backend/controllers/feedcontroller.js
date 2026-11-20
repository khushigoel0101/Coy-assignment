
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesPath = path.join(__dirname, "../data/profiles.json");
const swipesPath = path.join(__dirname, "../data/swipes.json");

export const getFeed = (req, res) => {
  try {
    const profiles = JSON.parse(
      fs.readFileSync(profilesPath, "utf-8")
    );

    const swipes = JSON.parse(
      fs.readFileSync(swipesPath, "utf-8")
    );

    // Get IDs of profiles already swiped
    const swipedProfileIds = swipes.map(
      (swipe) => swipe.profileId
    );

    // Only return profiles the user hasn't swiped
    const feed = profiles
      .filter((profile) => !swipedProfileIds.includes(profile.id))
      .map(({ likedYou, ...profile }) => profile);

    res.status(200).json(feed);

  } catch (error) {
    console.error("Feed error:", error);
    res.status(500).json({ message: "Could not load feed" });
  }
};
