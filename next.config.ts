import nextPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev, // 👈 this is the key
});

export default withPWA({
  reactStrictMode: true,
});