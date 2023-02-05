import express from "express";
import routes from "./routes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors("*"));
app.use("/auth", routes);
const PORT = 8080;
app.listen(PORT, (req, res) => {
  console.log("Server run successfully");
});
