export const shouldEnableLiveChat = () => {
  return !process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost");
};

export const isProductionEnvironment = () => {
  return process.env.NODE_ENV === "production";
};

export const isDevelopmentEnvironment = () => {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost")
  );
};
