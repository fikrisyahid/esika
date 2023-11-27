/**
 * Checks if the user has authorization to access a specific path based on their role.
 * @param {Object} options - The options object.
 * @param {string} options.path_role - The role required to access the path.
 * @param {Object} options.user - The user object containing role information.
 * @returns {boolean} - Returns true if the user has authorization, false otherwise.
 */
export default function isPathAuthorized({ path_role: pathRole, user }) {
  if (pathRole === "admin" && user?.Admin) {
    return true;
  }
  if (pathRole === "dosen" && user?.Dosen) {
    return true;
  }
  if (pathRole === "mahasiswa" && user?.Mahasiswa) {
    return true;
  }
  return false;
}
