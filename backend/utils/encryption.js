import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

export function encryptData(data, password) {
  // Ensure data is a Buffer
  const dataBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  
  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);

  // prepend IV so we can extract it later
  return Buffer.concat([iv, encrypted]);
}

export function decryptData(encryptedData, password) {
  // Ensure encryptedData is a Buffer
  const dataBuffer = Buffer.isBuffer(encryptedData) ? encryptedData : Buffer.from(encryptedData);
  
  const key = crypto.createHash("sha256").update(password).digest();

  const iv = dataBuffer.subarray(0, IV_LENGTH);
  const encrypted = dataBuffer.subarray(IV_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}
