import type { ExpoConfig } from "@expo/config";

const version = "1.0.2"; // EAS VERSION
// Should be bumped every time a new build is made
const buildNumber = "22"; // EAS VERSION

const defineConfig = (): ExpoConfig => ({
  name: "votey",
  slug: "votey",
  scheme: "votey",
  version,
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
    url: "https://u.expo.dev/5c6aa601-a9f2-4e03-bcd0-b35bb4509af6",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    buildNumber,
    bundleIdentifier: "mdd.votey",
    supportsTablet: true,
  },
  android: {
    versionCode: Number(
      version.replace(".", "").replace(".", "") + buildNumber,
    ),
    package: "mdd.votey",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2F4858",
    },
  },
  extra: {
    clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    eas: {
      projectId: "5c6aa601-a9f2-4e03-bcd0-b35bb4509af6",
      // projectId: "2447171b-3c6c-4260-ad6a-655bcc2fdd0e", // Real Id
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "./expo-plugins/with-modify-gradle.js",
    [
      "expo-updates",
      {
        username: "xiduzo",
      },
    ],
  ],
});

export default defineConfig;
