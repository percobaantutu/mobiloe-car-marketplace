import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

// Validate environment variables
if (!SendBirdApplicationId || !SendBirdApiToken) {
  console.error("Missing SendBird credentials in environment variables");
}

/**
 * Creates or updates a SendBird user
 * Uses upsert approach to avoid unique constraint violations
 */
export const createSendBirdUser = async (userId, nickname, profileUrl) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Sanitize userId to ensure it meets SendBird requirements
  // SendBird requires alphanumeric user IDs
  const sanitizedUserId = userId.replace(/[^a-zA-Z0-9_-]/g, "_");

  try {
    return await axios.post(
      `https://api-${SendBirdApplicationId}.sendbird.com/v3/users`,
      {
        user_id: sanitizedUserId,
        nickname: nickname || "User",
        profile_url: profileUrl || "",
        issue_access_token: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Token": SendBirdApiToken,
        },
      }
    );
  } catch (error) {
    // If user already exists, try to update instead
    if (error.response?.status === 400 && error.response?.data?.code === 400202) {
      return axios.put(
        `https://api-${SendBirdApplicationId}.sendbird.com/v3/users/${sanitizedUserId}`,
        {
          nickname: nickname || "User",
          profile_url: profileUrl || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Token": SendBirdApiToken,
          },
        }
      );
    }
    throw error;
  }
};

/**
 * Creates a group chat channel between users
 */
export const createChannel = async (userIds) => {
  if (!userIds || !userIds.length) {
    throw new Error("User IDs are required");
  }

  // Sanitize all userIds
  const sanitizedUserIds = userIds.map((id) => id.replace(/[^a-zA-Z0-9_-]/g, "_"));

  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`,
    {
      user_ids: sanitizedUserIds,
      name: "Car Chat",
      is_distinct: true, // This ensures a unique channel between the same users
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};
