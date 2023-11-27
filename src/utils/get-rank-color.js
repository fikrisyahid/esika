/**
 * Returns the color associated with a given rank.
 * @param {string} rank - The rank to get the color for.
 * @returns {string} The color associated with the given rank, or "black" if the rank is not found.
 */
export default function getRankColor(rank) {
  const rankColorConfig = {
    NEWBIE: "green",
    BEGINNER: "teal",
    INTERMEDIATE: "yellow",
    ADVANCED: "orange",
    EXPERT: "red",
    MASTER: "grape",
    TEACHER: "blue",
  };
  return rankColorConfig[rank] || "dark";
}
