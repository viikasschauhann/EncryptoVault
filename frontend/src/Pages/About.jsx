import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Lock, 
  Shield, 
  Eye, 
  Download, 
  Smartphone, 
  Globe, 
  Zap,
  CheckCircle,
  ArrowLeft,
  Github,
  ExternalLink
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import FloatingLock from '../components/FloatingLock';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Encryption",
      description: "Advanced encryption algorithms ensure your files are protected with military-grade security."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Privacy First",
      description: "All processing happens locally in your browser. Your files never leave your device."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized for speed with efficient algorithms and modern web technologies."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Responsive Design",
      description: "Works seamlessly across all devices - desktop, tablet, and mobile."
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Easy Download",
      description: "One-click download of your encrypted or decrypted files with original quality."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Support",
      description: "Supports any file type - documents, images, videos, archives, and more."
    }
  ];

  const benefits = [
    "No file size limitations",
    "Cross-platform compatibility",
    "No registration required",
    "Open source and transparent",
    "Regular security updates",
    "Community-driven development"
  ];

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen animated-bg particles-bg relative">
      <ParticleBackground />
      {/* Animated Header */}
      <header className="glass border-b border-gray-800 sticky top-0 z-40 slide-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-emerald-500"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to App</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <FloatingLock size="medium" />
              <h1 className="text-2xl font-bold text-white text-glow">EncryptoVault</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-12">
            <FloatingLock size="xlarge" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-8 text-glow">
            Secure File Encryption
            <span className="block text-emerald-400">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Protect your sensitive files with our advanced encryption technology. 
            All processing happens locally in your browser, ensuring complete privacy and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleGoBack}
              className="btn-primary btn-encrypt flex items-center justify-center space-x-3 py-4 px-8"
            >
              <Lock className="h-6 w-6" />
              <span className="text-lg">Start Encrypting</span>
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 flex items-center justify-center space-x-3 py-4 px-8"
            >
              <Github className="h-6 w-6" />
              <span className="text-lg">View Source</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 text-glow">
              Why Choose Our Vault?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with modern web technologies and security best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-10 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 stagger-item"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-8 text-white pulse-glow">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 text-glow">
              Key Benefits
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need for secure file management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-6 p-8 card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 stagger-item"
              >
                <CheckCircle className="h-8 w-8 text-emerald-400 flex-shrink-0 pulse-glow" />
                <span className="text-white font-medium text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Security Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="card p-16 text-center slide-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-10 pulse-glow">
              <Shield className="h-12 w-12 text-white float" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-8 text-glow">
              Your Privacy is Our Priority
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              All encryption and decryption processes happen locally in your browser. 
              Your files never leave your device, ensuring complete privacy and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="h-6 w-6 pulse-glow" />
                <span className="font-medium text-lg">No data transmission</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="h-6 w-6 pulse-glow" />
                <span className="font-medium text-lg">Client-side processing</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="h-6 w-6 pulse-glow" />
                <span className="font-medium text-lg">Open source code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <FloatingLock size="medium" />
            <h3 className="text-3xl font-bold text-glow">EncryptoVault</h3>
          </div>
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto text-lg leading-relaxed">
            A secure, privacy-focused file encryption application built with modern web technologies. 
            Your files, your control, your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={handleGoBack}
              className="btn-primary btn-encrypt flex items-center justify-center space-x-3 py-4 px-8"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="text-lg">Back to App</span>
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 flex items-center justify-center space-x-3 py-4 px-8"
            >
              <ExternalLink className="h-6 w-6" />
              <span className="text-lg">View on GitHub</span>
            </a>
          </div>
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-lg">
              © 2025 EncryptoVault. Built with ❤️ for privacy and security.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
