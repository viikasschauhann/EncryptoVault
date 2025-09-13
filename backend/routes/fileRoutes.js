import express from "express";
import multer from "multer";
import { encryptFile, decryptFile } from "../controllers/encryptController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/encrypt", upload.single("file"), encryptFile);
router.post("/decrypt", upload.single("file"), decryptFile);

export default router;
