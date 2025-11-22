import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("File Encryption/Decryption API is running");
})

// API routes
app.use("/api/files", fileRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
