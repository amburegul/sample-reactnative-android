import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Owner } from '@/components/objectCatalouge';

export const AuthContext = createContext<{
  signIn: (sessionObj: any) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  getToken:()=> string;
  getUserObject:() => any;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: true, // Start with loading state
  getToken: () => '',
  getUserObject: () => null,
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token on app start
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("token");
        if (storedSession) {
          // console.log('success,'+storedSession);
          setSession(storedSession);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setSession(storedToken);
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const signIn = async (token: any) => {
    await AsyncStorage.setItem("token", token);
    setSession(token);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setSession(null);
  };

  const getToken= ()=>{
    return session?JSON.parse(session).jwt:'';
  }

  const getUserObject= ()=>{
    return session?JSON.parse(session).userObject:null;
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, isLoading, getToken, getUserObject }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
