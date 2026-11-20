
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesPath = path.join(__dirname, "../data/profiles.json");
const swipesPath = path.join(__dirname, "../data/swipes.json");

export const swipeProfile = (req, res) => {
  try {
    const { profileId, action } = req.body;

    // Validate request
    if (!profileId || !["like", "pass"].includes(action)) {
      return res.status(400).json({
        message: "Valid profileId and action are required"
      });
    }

    const profiles = JSON.parse(
      fs.readFileSync(profilesPath, "utf-8")
    );

    const swipes = JSON.parse(
      fs.readFileSync(swipesPath, "utf-8")
    );

    const profile = profiles.find(
      (p) => p.id === Number(profileId)
    );

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    // Prevent duplicate swipes
    const alreadySwiped = swipes.some(
      (swipe) => swipe.profileId === Number(profileId)
    );

    if (alreadySwiped) {
      return res.status(409).json({
        message: "You have already swiped on this profile"
      });
    }

    // Save swipe
    const newSwipe = {
      profileId: Number(profileId),
      action
    };

    swipes.push(newSwipe);

    fs.writeFileSync(
      swipesPath,
      JSON.stringify(swipes, null, 2)
    );

    // Match only when both users liked each other
    const isMatch = action === "like" && profile.likedYou === true;

    res.status(201).json({
      message: isMatch ? "It's a match!" : "Swipe recorded",
      isMatch,
      profileId: Number(profileId)
    });

  } catch (error) {
    console.error("Swipe error:", error);
    res.status(500).json({
      message: "Could not record swipe"
    });
  }
};
