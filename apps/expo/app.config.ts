import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "votey",
  slug: "votey",
  scheme: "votey",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#2F4858",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "mdd.votey",
    supportsTablet: true,
  },
  android: {
    package: "mdd.votey",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2F4858",
    },
  },
  extra: {
    test: "what",
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    eas: {
      projectId: "2447171b-3c6c-4260-ad6a-655bcc2fdd0e",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
