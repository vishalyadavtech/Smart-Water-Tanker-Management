import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  loginWithGoogle: (role: Role) => Promise<void>;
  sendEmailOtp: (email: string, role: Role) => Promise<void>;
  verifyEmailOtp: (email: string, otp: string, role: Role) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aqua_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          localStorage.setItem('aqua_user', JSON.stringify(userData));
        }
      } else {
        // If not signed in via Firebase, check local storage (for custom OTP session)
        const saved = localStorage.getItem('aqua_user');
        if (!saved) setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (role: Role) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      // For this demo/dev environment, we allow users to switch roles if they select a different one during login.
      // Or if it's the specific admin email, we ensure they can get the admin role.
      let finalRole = role;
      const isAdminEmail = firebaseUser.email === "vishalyadav274731@gmail.com";
      
      if (userDoc.exists()) {
        const existingData = userDoc.data() as User;
        // If the user selects a different role, we update it in Firestore for this demo
        if (existingData.role !== role || (isAdminEmail && existingData.role !== 'admin')) {
          finalRole = isAdminEmail && role === 'admin' ? 'admin' : role;
          const updatedUser = { ...existingData, role: finalRole };
          await setDoc(doc(db, 'users', firebaseUser.uid), updatedUser);
          setUser(updatedUser);
          localStorage.setItem('aqua_user', JSON.stringify(updatedUser));
        } else {
          setUser(existingData);
          localStorage.setItem('aqua_user', JSON.stringify(existingData));
        }
      } else {
        const newUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'New User',
          email: firebaseUser.email || '',
          role: isAdminEmail && role === 'admin' ? 'admin' : role,
          createdAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
        setUser(newUser);
        localStorage.setItem('aqua_user', JSON.stringify(newUser));
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailOtp = async (email: string, role: Role) => {
    const response = await fetch('/api/auth/send-email-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to send OTP');
  };

  const verifyEmailOtp = async (email: string, otp: string, role: Role) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, role }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Invalid OTP');

      setUser(data.user);
      localStorage.setItem('aqua_user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Email OTP Verification Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('aqua_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, sendEmailOtp, verifyEmailOtp, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
