
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Coy Discover API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
