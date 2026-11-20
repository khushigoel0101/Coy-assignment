
import path from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/fileStorage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesPath = path.join(__dirname, "../data/profiles.json");
const swipesPath = path.join(__dirname, "../data/swipes.json");

export const swipeProfile = (req, res) => {
  try {
    const { profileId, action } = req.body ?? {};

    // Validate request
    if (
      !Number.isSafeInteger(profileId) ||
      profileId <= 0 ||
      !["like", "pass"].includes(action)
    ) {
      return res.status(400).json({
        message:
          "A positive integer profileId and a valid action (like/pass) are required"
      });
    }

    // Read data
    const profiles = readJSON(profilesPath);
    const swipes = readJSON(swipesPath);

    // Check whether profile exists
    const profile = profiles.find(
      (p) => p.id === profileId
    );

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    // Prevent duplicate swipes
    const alreadySwiped = swipes.some(
      (swipe) => swipe.profileId === profileId
    );

    if (alreadySwiped) {
      return res.status(409).json({
        message: "You have already swiped on this profile"
      });
    }

    // Save swipe
    const newSwipe = {
      profileId,
      action
    };

    swipes.push(newSwipe);
    writeJSON(swipesPath, swipes);

    // Check for mutual like
    const isMatch =
      action === "like" && profile.likedYou === true;

    return res.status(201).json({
      message: isMatch ? "It's a match!" : "Swipe recorded",
      isMatch,
      profileId
    });

  } catch (error) {
    console.error("Swipe error:", error);

    return res.status(500).json({
      message: "Could not record swipe"
    });
  }
};
