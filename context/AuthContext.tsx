import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TAuthProviderProps, TUserProps } from '../Types/types';


type AuthContextType = {
    userCredentials: TUserProps | null;
    register: (username: string, email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children, userCredentials, register,login, logout }: TAuthProviderProps) {

   return(
    <AuthContext.Provider value={{ 
        userCredentials,
        register, 
        login,
        logout
      }}>
        {children}
     </AuthContext.Provider>
   );
}

export function useAuth<AuthProviderProps>() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return {
        logout: context.logout,
        login: context.login,
        register:context.register,
        userCredentials: context.userCredentials
    };
}
