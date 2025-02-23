"use client"

import { createContext, useContext } from "react";

interface UserContextType {
    username: string;
    setUsername: (username: string) => void;
    description: string;
    setDescription: (description: string) => void;
    profilePicture: string;
    setProfilePicture: (profilePicture: string) => void;
    bannerPicture: string;
    setBannerPicture: (bannerPicture: string) => void;
    isAdmin: boolean; 
    setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = UserContext.Provider;