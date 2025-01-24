import { Config, Region, LivePreview, Stack } from "contentstack";
import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();
// const envConfig = process.env;
const {
  NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  NEXT_PUBLIC_CONTENTSTACK_BRANCH,
  NEXT_PUBLIC_CONTENTSTACK_REGION,
  NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
  NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST,
  NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
  NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW,
} = process.env;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY &&
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN &&
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW &&
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN &&
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST &&
    !!process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  if (!!process.env.NEXT_PUBLIC_CONTENTSTACK_REGION && process.env.NEXT_PUBLIC_CONTENTSTACK_REGION !== "us") {
    region = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      "-",
      "_"
    ) as keyof typeof Region;
  }
  return Region[region];
};
// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error("Your LP config is set to true. Please make you have set all required LP config in .env");
  return {
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN as string,
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true",
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST as string,
  } as LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error("Please set you .env file before running starter app");
  const stackConfig: Config = {
    api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
    delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
  };
  if (process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true") {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace("api", "cdn");
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url=''): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};


