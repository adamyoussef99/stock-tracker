import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'), // Adjust this path to your desired root
  }
};

export default nextConfig;
