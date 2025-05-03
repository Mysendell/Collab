"use client"

import {createContext, useContext, useState} from "react";

interface UserContextType {
    username: string;
    setUsername: (username: string) => void;
    description: string;
    setDescription: (description: string) => void;
    profilePicture: string;
    setProfilePicture: (profilePicture: string) => void;
    bannerPicture: string;
    setBannerPicture: (bannerPicture: string) => void;
    updateUserData: (data: Partial<UserContextType>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children, value }: { children: React.ReactNode; value: Partial<UserContextType> }) => {
    const [username, setUsername] = useState(value.username || "Not logged in");
    const [description, setDescription] = useState(value.description || "");
    const [profilePicture, setProfilePicture] = useState(value.profilePicture || "");
    const [bannerPicture, setBannerPicture] = useState(value.bannerPicture || "");

    const updateUserData = (data: Partial<UserContextType>) => {
        if (data.username !== undefined) setUsername(data.username);
        if (data.description !== undefined) setDescription(data.description);
        if (data.profilePicture !== undefined) setProfilePicture(data.profilePicture);
        if (data.bannerPicture !== undefined) setBannerPicture(data.bannerPicture);
    };

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
                description,
                setDescription,
                profilePicture,
                setProfilePicture,
                bannerPicture,
                setBannerPicture,
                updateUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};