"use client"

import { useUser } from "@/app/UserContext";
import { useEffect, useRef, useState } from "react";
import { updateDescription, uploadBannerPicture, uploadProfilePicture } from "./dashboard";

export default function Page() {
    let bannerUrl = "/DefaultBanner/Banner.png";
    let profileUrl = "/defaultProfilePictures/Sigil1.png";
    const { username, description, profilePicture, bannerPicture, isAdmin } = useUser();
    const [showBannerInput, setShowBannerInput] = useState(false);
    const [showProfileInput, setShowProfileInput] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newDescription, setNewDescription] = useState(description);
    const bannerImage = useRef<HTMLImageElement>(null);
    const profileImage = useRef<HTMLImageElement>(null);
    const descriptionText = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bannerImage.current!.src = bannerPicture !== "http://localhost:8000" ? bannerPicture : bannerUrl;
        profileImage.current!.src = profilePicture !== "http://localhost:8000" ? profilePicture : profileUrl;
        setNewDescription(description);
    }, [bannerPicture, profilePicture, description]);

    useEffect(() => {
        if (!isEditingDescription && descriptionText.current) {
            descriptionText.current.innerText = newDescription;
        }
    }, [isEditingDescription, newDescription]);

    function setProfile(newProfileUrl: string) {
        if (newProfileUrl !== "http://localhost:8000" && profileImage.current) {
            profileImage.current.src = newProfileUrl;
        }
    }

    function setBanner(newBannerUrl: string) {
        if (newBannerUrl !== "http://localhost:8000" && bannerImage.current) {
            bannerImage.current.src = newBannerUrl;
        }
    }

    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & { files: FileList };
    }

    const handleBannerChange = async (event: FileChangeEvent) => {
        const file = event.target.files[0];
        if (file) {
            setBanner(await uploadBannerPicture(file));
            setShowBannerInput(false);
        }
    }

    const handleProfileChange = async (event: FileChangeEvent) => {
        const file = event.target.files[0];
        if (file) {
            setProfile(await uploadProfilePicture(file));
            setShowProfileInput(false);
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(event.target.value);
    };

    const saveDescription = async () => {
        await updateDescription(newDescription);
        setIsEditingDescription(false);
    };

    return (
        <div className="flex flex-col items-center bg-background text-palePurple h-full" style={{ width: "100vw", height: "80vh" }}>
            <div className="w-full relative group">
                <img ref={bannerImage} src={bannerUrl} alt="banner" className="w-full h-56 shadow-lg shadow-foreground cursor-pointer" onClick={() => setShowBannerInput(true)} />
                <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setShowBannerInput(true)}>Edit</div>
                {showBannerInput && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <input type="file" accept="image/*" onChange={handleBannerChange} className="p-2 rounded" />
                        <button onClick={() => setShowBannerInput(false)} className="ml-2 bg-white text-black px-2 py-1 rounded">Close</button>
                    </div>
                )}
            </div>
            <div className="relative w-full bg-violet shadow shadow-foreground">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 group">
                    <img ref={profileImage} src={profileUrl} alt="profile picture" className="h-24 w-24 rounded-full border-4 border-palePurple cursor-pointer shadow-foreground" onClick={() => setShowProfileInput(true)} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setShowProfileInput(true)}>Edit</div>
                    {showProfileInput && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <input type="file" accept="image/*" onChange={handleProfileChange} className="p-2 rounded" />
                            <button onClick={() => setShowProfileInput(false)} className="ml-2 bg-white text-black px-2 py-1 rounded">Close</button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center mt-12">
                    <div className="text-xl font-bold">{username}</div>
                    <div className="text-sm text-detail">{isAdmin ? "Admin" : "User"}</div>
                </div>
            </div>
            <div className="flex w-full mt-4 px-4 overflow-x-auto">
                <div className="w-2/3 p-4 bg-violet shadow-sm shadow-foreground mr-4 relative overflow-x-hidden">
                    <div className="text-lg font-semibold text-detail">About</div>
                    {isEditingDescription ? (
                        <div>
                            <textarea value={newDescription} onChange={handleDescriptionChange} className={"w-full p-2 rounded text-background"} style={{boxSizing: "border-box"}}/>
                            <button onClick={saveDescription} className="mt-2 bg-white text-black px-2 py-1 rounded">Save</button>
                        </div>
                    ) : (
                        <div>
                            <div ref={descriptionText} className="text-palePurple mt-2">{description}</div>
                            <button onClick={() => setIsEditingDescription(true)} className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded shadow-md">Edit Description</button>
                        </div>
                    )}
                    <div className="mt-4">
                        <div className="text-lg font-semibold text-detail">Recent Posts</div>
                        {/* Recent posts will be added here */}
                    </div>
                </div>
                <div className="w-1/3 p-4 bg-violet shadow-sm shadow-foreground">
                    <div className="text-lg font-semibold text-detail">Tags</div>
                    {/* User tags will be added here */}
                </div>
            </div>
        </div>
    );
}
