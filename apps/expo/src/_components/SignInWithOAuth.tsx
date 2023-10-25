import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Button } from "./Button";

WebBrowser.maybeCompleteAuthSession();

export const SignInWithOAuth = () => {
  const { push } = useRouter();
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_discord",
    redirectUrl: "votey://oauth-native-callback",
  });

  const handleSignInWithDiscord = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId })
          .then(() => push("/event/"))
          .catch(console.log);
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log("OAuth error", JSON.stringify(err, null, 2));
    }
  }, [startOAuthFlow, push]);

  return (
    <Button
      endIcon="chevron-right"
      title="Sign in with Discord"
      onPress={handleSignInWithDiscord}
    />
  );
};
