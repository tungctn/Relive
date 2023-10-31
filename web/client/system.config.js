module.exports = {
  apps: [
    {
      name: "react-app",
      script: "npm",
      args: "start",
      env: {
        NODE_OPTIONS: "--openssl-legacy-provider",
      },
    },
  ],
};
