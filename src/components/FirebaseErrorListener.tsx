'use client';

import React, { useEffect } from 'react';
import { errorEmitter } from '../firebase/error-emitter';

export const FirebaseErrorListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // In a real dev environment, this would trigger the Next.js/Vite error overlay.
      // For now, we'll log it in a way that the platform can detect.
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.removeListener('permission-error', handlePermissionError);
    };
  }, []);

  return <>{children}</>;
};
