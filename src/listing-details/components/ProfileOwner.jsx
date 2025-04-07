"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createSendBirdUser, createChannel } from "./../../Shared/Service";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

function ProfileOwner({ carDetail }) {
  const { user } = useUser();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const messageOwner = async () => {
    if (!user) return;

    setIsLoading(true);

    const userId = user.primaryEmailAddress?.emailAddress.split("@")[0];
    const ownerUserId = carDetail?.created_by.split("@")[0];

    try {
      // Create current user in SendBird
      await createSendBirdUser(userId, user.fullName, user.imageUrl);

      // Create owner user in SendBird
      await createSendBirdUser(ownerUserId, carDetail?.user_name, carDetail?.user_image_url);

      // Create chat channel
      await createChannel([userId, ownerUserId], `Chat with ${carDetail?.user_name}`);

      console.log("Channel Created");
      navigation("/profile");
    } catch (error) {
      console.error("Failed to setup chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2 flex flex-col justify-center">
      <h2 className="font-semibold text-4xl text-center">Profil Owner</h2>
      {carDetail?.user_name ? (
        <div className="w-full flex flex-col items-center gap-2 justify-center mt-3">
          <img src={carDetail?.user_image_url || "/placeholder.svg"} alt="profile" className="h-10 w-10 object-cover rounded-full" />
          <h2 className="text-xl">{carDetail.user_name}</h2>
          <h2 className="text-gray-600">{carDetail.created_by}</h2>
          <Button className="w-full text-md bg-green-500 rounded-xl" size="lg" onClick={messageOwner} disabled={isLoading}>
            {isLoading ? "Creating Chat..." : "Message Owner"}
          </Button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2 animate-pulse h-60" />
      )}
    </div>
  );
}

export default ProfileOwner;
