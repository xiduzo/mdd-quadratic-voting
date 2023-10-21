import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";

import { Header } from "~/_components/Header";
import { TRPCProvider } from "~/utils/api";

SplashScreen.preventAutoHideAsync();

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    SplashScreen.hideAsync().catch(console.error);
    return setAppIsReady(true);
  }, [fontsLoaded, fontError]);

  if (!appIsReady) return null;

  return (
    // <ClerkProvider
    //   tokenCache={tokenCache}
    //   publishableKey="pk_test_c3VtbWFyeS1zaGFkLTU2LmNsZXJrLmFjY291bnRzLmRldiQ"
    // >
    <TRPCProvider>
      <Updater />
      <StatusBar />
      <View className="flex-1">
        <Stack screenOptions={{ header: Header }} />
      </View>
    </TRPCProvider>
    // </ClerkProvider>
  );
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default RootLayout;

const Updater = () => {
  const handleUpdate = useCallback(({ type }: Updates.UpdateEvent) => {
    if (type === Updates.UpdateEventType.ERROR) {
      // Handle error
    } else if (type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      // Handle no update available
    } else if (type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      // Handle update available
      Updates.fetchUpdateAsync()
        .then(() => {
          Updates.reloadAsync().catch(console.error);
        })
        .catch(console.error);
    }
  }, []);

  Updates.useUpdateEvents(handleUpdate);

  return null;
};
