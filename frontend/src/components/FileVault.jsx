import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

import {
  Upload,
  Lock,
  Download,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Loader2,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import FloatingLock from "./FloatingLock";

const EncryptedFileVault = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [processedFile, setProcessedFile] = useState(null);

  const fileInputRef = useRef(null);

  // File handling functions
  const handleFileSelect = (file) => {
  if (file && file.name) {   // allow .enc files
    setSelectedFile(file);
    setShowError(false);
  }
};


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Placeholder encryption/decryption functions
  async function handleEncrypt() {
    const fileInput = selectedFile;
    const passwordInput = password;

    if (!fileInput) {
      alert("Please select a file");
      return;
    }

    if (!passwordInput) {
      alert("Please enter a password");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("password", passwordInput);

    try {
      const response = await fetch(`${backendUrl}/api/files/encrypt`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Error: " + error.error);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // generate encrypted file name
      const encryptedName = fileInput.name + ".enc";

      const a = document.createElement("a");
      a.href = url;
      a.download = encryptedName;
      a.click();

      window.URL.revokeObjectURL(url);

      alert("File encrypted successfully!");
    } catch (error) {
      console.error("Encryption error:", error);
      alert("Encryption failed: " + error.message);
    }
  }

  async function handleDecrypt() {
    const fileInput = selectedFile;
    const passwordInput = password;

    if (!fileInput) {
      alert("Please select an encrypted file (.enc)");
      return;
    }

    if (!passwordInput) {
      alert("Please enter a password");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("password", passwordInput);

    try {
      const response = await fetch(`${backendUrl}/api/files/decrypt`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Error: " + error.error);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // restore original file name by removing .enc
      let originalName = fileInput.name.replace(/\.enc$/, "");

      // fallback name if user uploads wrong filename
      if (originalName === fileInput.name) {
        originalName = "decrypted_file";
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = originalName;
      a.click();

      window.URL.revokeObjectURL(url);

      alert("File decrypted successfully!");
    } catch (error) {
      console.error("Decryption error:", error);
      alert("Decryption failed: " + error.message);
    }
  }

  const handleEncryptClick = async () => {
    if (!selectedFile || !password) {
      setErrorMessage("Please select a file and enter a password.");
      setShowError(true);
      return;
    }
    await handleEncrypt(selectedFile, password);
  };

  const handleDecryptClick = async () => {
    if (!selectedFile || !password) {
      setErrorMessage("Please select a file and enter a password.");
      setShowError(true);
      return;
    }
    await handleDecrypt(selectedFile, password);
  };

  const downloadFile = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = processedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPassword("");
    setShowPassword(false);
    setShowSuccess(false);
    setShowError(false);
    setProcessedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen animated-bg particles-bg relative">
      <ParticleBackground />
      {/* Animated Navbar */}
      <nav className="glass border-b border-gray-800 sticky top-0 z-50 slide-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <FloatingLock size="medium" />
              <h1 className="text-2xl font-bold text-white text-glow">
                EncryptoVault
              </h1>
            </div>
            <button
              onClick={() => navigate("/about")}
              className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-emerald-500"
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="card p-12 slide-in-up">
          {/* Animated Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <FloatingLock size="xlarge" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 text-glow">
              EncryptoVault
            </h2>
            <p className="text-gray-300 text-lg">
              Securely encrypt and decrypt files in your browser.
            </p>
          </div>

          {/* File Upload Area */}
          <div className="mb-8 slide-in-left">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Select File
            </label>
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-emerald-400 bg-emerald-500/10 scale-105"
                  : "border-gray-600 hover:border-emerald-500 hover:bg-gray-800/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".enc,.bin,*/*"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {selectedFile ? (
                <div className="flex items-center justify-center space-x-4">
                  <FileText className="h-10 w-10 text-emerald-400 float" />
                  <div className="text-left">
                    <p className="font-medium text-white text-lg">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6 float" />
                  <p className="text-gray-300 mb-3 text-lg">
                    Drag and drop your file here, or{" "}
                    <span className="text-emerald-400 font-medium">browse</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports any file type
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-8 slide-in-right">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field pl-14 pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors duration-200 focus:outline-none focus:text-emerald-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <button
              onClick={handleEncryptClick}
              disabled={isLoading}
              className="btn-primary btn-encrypt flex-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Lock className="h-6 w-6" />
              )}
              <span className="text-lg">Encrypt File</span>
            </button>

            <button
              onClick={handleDecryptClick}
              disabled={isLoading}
              className="btn-primary btn-decrypt flex-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Download className="h-6 w-6" />
              )}
              <span className="text-lg">Decrypt File</span>
            </button>
          </div>

          {/* Loading Progress */}
          {isLoading && (
            <div className="mb-8 slide-in-up">
              <div className="flex items-center justify-center space-x-3 text-gray-300">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
                <span className="text-lg">Processing your file...</span>
              </div>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card p-8 max-w-md w-full slide-in-up">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-emerald-400 pulse-glow" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-3 text-glow">
              Success!
            </h3>
            <p className="text-gray-300 text-center mb-8 text-lg">
              Your file has been processed successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadFile}
                className="btn-primary btn-encrypt flex items-center justify-center space-x-3 py-3"
              >
                <Download className="h-6 w-6" />
                <span>Download File</span>
              </button>
              <button
                onClick={resetForm}
                className="btn-primary bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 flex items-center justify-center space-x-3 py-3"
              >
                Process Another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card p-8 max-w-md w-full slide-in-up">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-400 pulse-glow" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-3 text-glow">
              Error
            </h3>
            <p className="text-gray-300 text-center mb-8 text-lg">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              className="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500 w-full py-3 text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncryptedFileVault;
