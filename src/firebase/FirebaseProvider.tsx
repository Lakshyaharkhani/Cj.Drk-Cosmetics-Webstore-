import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions, httpsCallable } from 'firebase/functions';
import { firebaseConfig } from './firebaseConfig';

interface FirebaseContextType {
  auth: ReturnType<typeof getAuth> | null;
  firestore: Firestore | null;
  functions: Functions | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  auth: null,
  firestore: null,
  functions: null,
  user: null,
  loading: true,
  isAdmin: false,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<ReturnType<typeof getAuth> | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [functions, setFunctions] = useState<Functions | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const authInstance = getAuth(app);
    const firestoreInstance = getFirestore(app);
    const functionsInstance = getFunctions(app);

    setAuth(authInstance);
    setFirestore(firestoreInstance);
    setFunctions(functionsInstance);

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
      setIsAdmin(user?.email === 'h.penterprisehp5541@gmail.com');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, firestore, user, loading, isAdmin, functions }}>
      {children}
    </FirebaseContext.Provider>
  );
};
