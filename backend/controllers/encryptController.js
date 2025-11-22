import { encryptData, decryptData } from "../utils/encryption.js";
import fs from "fs";

export const encryptFile = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const password = req.body.password;

    // Read uploaded file
    const fileData = fs.readFileSync(req.file.path);

    // Encrypt the file
    const encryptedBuffer = encryptData(fileData, password);

    // Remove temp uploaded file
    fs.unlinkSync(req.file.path);

    // Name the encrypted output using original file name + .enc suffix
    const encryptedName = req.file.originalname + ".enc";

    // Send encrypted file
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encryptedName}"`
    );

    res.send(encryptedBuffer);

  } catch (error) {
    console.error("Encryption error:", error);
    res.status(500).json({ error: "Encryption failed" });
  }
};

export const decryptFile = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const password = req.body.password;

    // Read encrypted file
    const encryptedData = fs.readFileSync(req.file.path);

    // Decrypt
    const decryptedBuffer = decryptData(encryptedData, password);

    // Remove temp uploaded file
    fs.unlinkSync(req.file.path);

    /**
     * 🔥 IMPORTANT:
     * Remove the ".enc" extension from the filename
     * Example:
     *   Input: "resume.pdf.enc"
     *   Output: "resume.pdf"
     */
    let originalName = req.file.originalname;

    if (originalName.endsWith(".enc")) {
      originalName = originalName.slice(0, -4); // remove ".enc"
    }

    // Send decrypted file back with original filename
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${originalName}"`
    );

    res.send(decryptedBuffer);

  } catch (error) {
    console.error("Decryption error:", error);
    res.status(400).json({ error: "Wrong password or corrupted file" });
  }
};
