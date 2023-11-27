/**
 * Generates a random code of specified length.
 *
 * @param {number} [length=4] - The length of the code to be generated.
 * @returns {string} The generated code.
 */
export default function generateCode(length = 4) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  Array.from({ length }).forEach(() => {
    code += chars[Math.floor(Math.random() * chars.length)];
  });
  return code;
}
