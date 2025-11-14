# EncryptoVault

A secure, privacy-focused file encryption application with a modern React frontend and a lightweight Node.js/Express backend. Encrypt and decrypt files using a password, with a streamlined UI and simple developer setup.

## Features
- Secure file encryption using `AES-256-CBC` with random IV
- Password-derived key with SHA-256
- File uploads via `multer` and REST endpoints for encryption/decryption
- Clean and animated UI built with React + Vite + Tailwind
- Simple flows to select a file, enter password, encrypt/decrypt, and download the result

## Tech Stack
- Frontend: `React 18`, `Vite`, `TailwindCSS`, `react-router`, `lucide-react`
- Backend: `Node.js`, `Express`, `multer`, `cors`, `dotenv`
- Build/Dev: `vite`, `nodemon`, `eslint`

## Repository Structure
- `frontend/` React + Vite app (UI)
  - `src/components/FileVault.jsx` main UI for upload/encrypt/decrypt
  - `src/components/ParticleBackground.jsx` canvas particle background
  - `src/components/FloatingLock.jsx` lock icon component
  - `src/Pages/About.jsx` product overview page
  - `src/App.jsx` routes (`/` and `/about`)
  - `index.css`, `tailwind.config.js`, `vite.config.js`
- `backend/` Node.js API
  - `index.js` Express server and route mounting (`/api/files`)
  - `routes/fileRoutes.js` endpoints: `POST /encrypt`, `POST /decrypt`
  - `controllers/encryptController.js` file handling and response streaming
  - `utils/encryption.js` AES-256-CBC encrypt/decrypt helpers

## How It Works
- Client selects a file and provides a password in the UI (`frontend/src/components/FileVault.jsx`)
- Backend accepts file uploads and combines with password to produce encrypted/decrypted output:
  - Encryption: derives a 32-byte key from the password, generates a random IV, encrypts the data, and prepends IV to ciphertext
  - Decryption: splits the IV and ciphertext, derives key from password, decrypts the data
- API streams processed file back with appropriate `Content-Disposition` headers:
  - Encrypt: `encrypted.bin`
  - Decrypt: `decrypted.txt`

Note: The current frontend component uses simulated processing placeholders and does not call the backend yet. See “Frontend Integration” to wire it up.

## Quick Start

### Prerequisites
- Node.js v18+ and npm
- A modern browser (Chrome, Firefox, Edge, Safari)

### Backend
- `cd backend`
- `npm install`
- Create `.env`:
  - `PORT=5000`
- Start dev server:
  - `npm run dev` (uses nodemon)
- Production start:
  - `npm start`

Server runs on `http://localhost:5000/` and exposes:
- `POST /api/files/encrypt`
- `POST /api/files/decrypt`

Uploads are saved temporarily to `uploads/` via `multer`.

### Frontend
- `cd frontend`
- `npm install`
- Dev:
  - `npm run dev` (Vite dev server)
- Build:
  - `npm run build`
- Preview:
  - `npm run preview`

Frontend dev server typically runs at `http://localhost:5173/`.

## Scripts

### Backend
- `npm run dev` — start with nodemon
- `npm start` — start with node

### Frontend
- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview built bundle
- `npm run lint` — run eslint checks

## API Reference

Base URL: `http://localhost:<PORT>/api/files`

- `POST /encrypt`
  - Form Data:
    - `file` — binary file upload (`multipart/form-data`)
    - `password` — string
  - Response: `application/octet-stream` attachment `encrypted.bin`

- `POST /decrypt`
  - Form Data:
    - `file` — binary file upload (`multipart/form-data`)
    - `password` — string
  - Response: attachment `decrypted.txt`

### cURL Examples

Encrypt:
```
curl -X POST http://localhost:5000/api/files/encrypt \
  -F "file=@/path/to/yourfile.bin" \
  -F "password=yourStrongPassword" \
  -o encrypted.bin
```

Decrypt:
```
curl -X POST http://localhost:5000/api/files/decrypt \
  -F "file=@encrypted.bin" \
  -F "password=yourStrongPassword" \
  -o decrypted.txt
```

## Frontend Integration

Replace the placeholder functions in `frontend/src/components/FileVault.jsx` with real API calls. Example for encryption:

```js
const handleEncrypt = async (file, password) => {
  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    const res = await fetch('http://localhost:5000/api/files/encrypt', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Encryption failed');

    const blob = await res.blob();
    const encryptedFile = new File([blob], `encrypted_${file.name}`, { type: 'application/octet-stream' });
    setProcessedFile(encryptedFile);
    setShowSuccess(true);
  } catch (error) {
    setErrorMessage(error.message || 'Encryption failed. Please try again.');
    setShowError(true);
  } finally {
    setIsLoading(false);
  }
};
```

Similarly for decryption:
```js
const handleDecrypt = async (file, password) => {
  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    const res = await fetch('http://localhost:5000/api/files/decrypt', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Decryption failed');

    const blob = await res.blob();
    const decryptedFile = new File([blob], `decrypted_${file.name}`, { type: 'application/octet-stream' });
    setProcessedFile(decryptedFile);
    setShowSuccess(true);
  } catch (error) {
    setErrorMessage(error.message || 'Decryption failed. Please check your password.');
    setShowError(true);
  } finally {
    setIsLoading(false);
  }
};
```

If running frontend and backend on different ports, ensure CORS is enabled (already configured in the backend) and adjust URLs as needed.

## Security Notes

Current implementation:
- Uses `AES-256-CBC` without authentication (no MAC/AEAD), which does not detect tampering
- Derives encryption key via `SHA-256(password)` without salt or KDF, which is vulnerable to brute-force attacks

Recommendations for production:
- Use an authenticated cipher like `AES-256-GCM` or add an HMAC over ciphertext and IV
- Derive keys with a proper KDF (e.g., `crypto.scrypt` or `PBKDF2`) with a unique salt per file; store salt alongside IV and ciphertext
- Consider streaming encryption for very large files and secure deletion of temporary uploads
- Enforce password strength requirements on the client and server

## Environment
- Backend `.env`:
  - `PORT=5000`
- Frontend environment typically not required; configure API base URL where needed

## License
- ISC

## Acknowledgements
- Icons from `lucide-react`
- Styling with TailwindCSS
