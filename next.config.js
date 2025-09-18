const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'football-wrapper': path.resolve(__dirname, './node_modules/football-wrapper'),
    };

    config.resolve.fallback = { fs: false }; // Remove APIs Node.js que não existem no frontend
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photoai.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "avatarai.me",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};
