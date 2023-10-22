import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Button } from "./Button";

WebBrowser.maybeCompleteAuthSession();

export const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId }).catch(console.log);
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log("OAuth error", err);
    }
  }, [startOAuthFlow]);

  return <Button endIcon="chevron-right" title="Sign in" onPress={onPress} />;
};
