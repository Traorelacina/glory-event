'use client';

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de l'administration...</p>
        <p className="text-sm text-gray-500 mt-2">Vérification des permissions</p>
      </div>
    </div>
  );
};

export default Loading;