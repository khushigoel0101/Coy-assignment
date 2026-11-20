
import express from "express";
import { getFeed } from "../controllers/feedcontroller.js"
import { swipeProfile } from "../controllers/swipecontroller.js"
import { getMatches } from "../controllers/matchcontroller.js"

const router = express.Router();

router.get("/feed", getFeed);

router.post("/swipe", swipeProfile);

router.get("/matches", getMatches);

export default router;
