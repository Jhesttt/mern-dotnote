import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoute from "./routes/notesRoute.js"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is listening in PORT:", PORT);
    });
});

app.use(express.json());
app.use(cors());

app.use("/api/notes", notesRoute);