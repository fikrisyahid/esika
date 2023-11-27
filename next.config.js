/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
