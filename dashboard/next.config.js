/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_ROOT_USERNAME: process.env.MONGO_ROOT_USERNAME,
    MONGO_ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD,
    MONGO_ROOT_SERVER: process.env.MONGO_ROOT_SERVER,
    MONGO_ROOT_PORT: process.env.MONGO_ROOT_PORT,
  },
};

module.exports = nextConfig;
