/**
 * Returns the color associated with the given difficulty rank.
 *
 * @param {string} rank - The difficulty rank.
 * @returns {string} The color associated with the given difficulty rank.
 */
export default function getDifficultyColor(rank) {
  const difficultyColorConfig = {
    EASY: "green",
    MEDIUM: "yellow",
    HARD: "red",
  };
  return difficultyColorConfig[rank] || "dark";
}
