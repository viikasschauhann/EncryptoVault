import React from 'react';
import { Lock } from 'lucide-react';

const FloatingLock = ({ size = 'large', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main floating lock */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-pulse opacity-20 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <Lock className="w-full h-full p-3 text-white" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full opacity-30 scale-110 -z-10 animate-ping"></div>
      </div>
      
      {/* Floating particles around the lock */}
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 -left-3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default FloatingLock;
