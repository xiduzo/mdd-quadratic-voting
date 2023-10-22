import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";

export const useSecureStore = (key: string) => {
  const getToken = useCallback(() => {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  }, [key]);

  const saveToken = useCallback(
    (value: string) => {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return null;
      }
    },
    [key],
  );

  return {
    getToken,
    saveToken,
  };
};
