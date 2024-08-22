const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;
const config = {
  ENV: env.MODE,
  BASE_URL: env.VITE_BASE_URL,
  OA_ID: env.VITE_OA_ID,
  DEFAULT_ACCESS_TOKEN: env.VITE_DEFAULT_ACCESS_TOKEN,
  API_HOST: env.VITE_API_HOST || "http://localhost:3001/api",
  WS_HOST: env.VITE_WS_HOST || "ws://localhost:3001/socket.io",
  DEV: env.VITE_DEV == "true",
  VITE_DEEP_LINK: env.VITE_DEEP_LINK,
  VITE_ZALO_ENV: env.VITE_ZALO_ENV,

  EXPIRE_INVITE: 30 * 24 * 60 * 60, // seconds
  VITE_PORTAL_HOST: env.VITE_PORTAL_HOST || "",

  //
  CLOUD_FRONT_HOST: "https://s3.hn-1.cloud.cmctelecom.vn/bhxhs32024",
};

export default config;
