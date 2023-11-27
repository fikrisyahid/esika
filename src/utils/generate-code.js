/**
 * Generates a random code consisting of 6 alphanumeric characters.
 *
 * @returns {string} The generated code.
 */
export default function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  Array.from({ length: 6 }).forEach(() => {
    code += chars[Math.floor(Math.random() * chars.length)];
  });
  return code;
}
