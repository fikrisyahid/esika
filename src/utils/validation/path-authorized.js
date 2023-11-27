/**
 * Checks if the user has authorization to access a specific path based on their role.
 * @param {Object} options - The options object.
 * @param {string} options.path_role - The role required to access the path.
 * @param {Object} options.user - The user object containing role information.
 * @returns {boolean} - Returns true if the user has authorization, false otherwise.
 */
export default function isPathAuthorized({ path_role: pathRole, user }) {
  if (pathRole === "admin") {
    return user?.Admin;
  }
  if (pathRole === "dosen") {
    return user?.Dosen;
  }
  if (pathRole === "mahasiswa") {
    return user?.Mahasiswa;
  }
  return false;
}
