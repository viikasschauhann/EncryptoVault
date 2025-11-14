import { encryptData, decryptData } from "../utils/encryption.js";
import fs from "fs";

export const encryptFile = async (req, res) => {
  try {
    const password = req.body.password;
    const fileData = fs.readFileSync(req.file.path);

    const encryptedBuffer = encryptData(fileData, password);

    // Send file as download
    res.setHeader("Content-Disposition", "attachment; filename=encrypted.bin");
    res.send(encryptedBuffer);
  } catch (error) {
    res.status(500).json({ error: "Encryption failed" });
  }
};

export const decryptFile = (req, res) => {
  try {
    const password = req.body.password;
    const encryptedData = fs.readFileSync(req.file.path);

    const decryptedBuffer = decryptData(encryptedData, password);

    res.setHeader("Content-Disposition", "attachment; filename=decrypted.txt");
    res.send(decryptedBuffer);
  } catch (error) {
    res.status(400).json({ error: "Wrong password or corrupted file" });
  }
};
