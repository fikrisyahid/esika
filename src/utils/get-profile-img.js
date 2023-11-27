import { IMAGE_PROFILE_API } from "@/configs";

/**
 * Returns the URL of a user's profile image.
 * @param {string} username - The username of the user.
 * @returns {string} The URL of the user's profile image.
 */
export default function getProfileImg(username) {
  return `${IMAGE_PROFILE_API}?seed=${username}`;
}
