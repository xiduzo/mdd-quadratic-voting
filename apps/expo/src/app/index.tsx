import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Link } from "expo-router";

import { Egg, Votey } from "~/_components";
import { Typography } from "~/_components/Typography";

const HomePage = () => {
  // const { replace } = useRouter();
  // useWarmUpBrowser();

  const eggAnimation = useRef(new Animated.Value(600)).current;

  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });
  // const { sessionId } = useAuth();

  // const handleSignInWithDiscordPress = React.useCallback(async () => {
  //   try {
  //     const { createdSessionId, setActive } = await startOAuthFlow();
  //     if (createdSessionId) {
  //       await setActive?.({ session: createdSessionId });
  //       replace("/event/");
  //     } else {
  //       // console.log({ signIn, signUp, authSessionResult });
  //       // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
  //       throw new Error(
  //         "There are unmet requirements, modify this else to handle them",
  //       );
  //     }
  //   } catch (err) {
  //     console.log(JSON.stringify(err, null, 2));
  //     console.log("error signing in", err);
  //   }
  // }, [startOAuthFlow, replace]);

  // useEffect(() => {
  //   if (!sessionId) return;

  //   replace("/event/");
  // }, [sessionId, replace]);

  useEffect(() => {
    Animated.spring(eggAnimation, {
      toValue: 450,
      velocity: 100,
      damping: 6,
      useNativeDriver: false,
    }).start();
  });

  return (
    <SafeAreaView className="bg-primary px-8">
      <View className="absolute -right-16 top-0">
        <Animated.View style={{ marginTop: eggAnimation }}>
          <View className="absolute left-20 top-40 z-10">
            <Svg width={74} height={34}>
              <Path
                d="M70.0965 32.1353C73.3443 29.8831 74.0865 25.5159 71.7412 22.3835C60.8401 7.81859 48.8049 0.599029 35.9148 0.999163C15.3475 1.59936 1.79833 21.8747 1.23427 22.7321C-0.903202 25.9847 0.100214 30.2832 3.47861 32.3525C6.85107 34.4218 11.3338 33.4671 13.4951 30.2146C13.596 30.066 23.5649 15.2954 36.4076 14.9581C44.2272 14.9238 52.0765 19.9998 59.9732 30.5462C61.3923 32.4382 63.6129 33.45 65.8691 33.45C67.3297 33.4557 68.8141 33.027 70.0965 32.1353Z"
                fill="#2F4858"
              />
            </Svg>
          </View>
          <View className="absolute left-52 top-40 z-10">
            <Svg width={74} height={34}>
              <Path
                d="M70.0965 32.1353C73.3443 29.8831 74.0865 25.5159 71.7412 22.3835C60.8401 7.81859 48.8049 0.599029 35.9148 0.999163C15.3475 1.59936 1.79833 21.8747 1.23427 22.7321C-0.903202 25.9847 0.100214 30.2832 3.47861 32.3525C6.85107 34.4218 11.3338 33.4671 13.4951 30.2146C13.596 30.066 23.5649 15.2954 36.4076 14.9581C44.2272 14.9238 52.0765 19.9998 59.9732 30.5462C61.3923 32.4382 63.6129 33.45 65.8691 33.45C67.3297 33.4557 68.8141 33.027 70.0965 32.1353Z"
                fill="#2F4858"
              />
            </Svg>
          </View>
          <View className="absolute left-36 top-64 z-10 rotate-180">
            <Svg width={74} height={34}>
              <Path
                d="M70.0965 32.1353C73.3443 29.8831 74.0865 25.5159 71.7412 22.3835C60.8401 7.81859 48.8049 0.599029 35.9148 0.999163C15.3475 1.59936 1.79833 21.8747 1.23427 22.7321C-0.903202 25.9847 0.100214 30.2832 3.47861 32.3525C6.85107 34.4218 11.3338 33.4671 13.4951 30.2146C13.596 30.066 23.5649 15.2954 36.4076 14.9581C44.2272 14.9238 52.0765 19.9998 59.9732 30.5462C61.3923 32.4382 63.6129 33.45 65.8691 33.45C67.3297 33.4557 68.8141 33.027 70.0965 32.1353Z"
                fill="#2F4858"
              />
            </Svg>
          </View>
          <Egg />
        </Animated.View>
      </View>
      <View className="h-full w-full">
        <View className="mb-11">
          <Votey />
        </View>
        <Typography intent="4xl" className="max-w-xs">
          Don&apos;t put all your eggs in one basket
        </Typography>
        <Typography className="mb-10">
          Shape the future of your community equitably with our token based
          voting system.
        </Typography>

        {/* <Button
          endIcon="chevron-right"
          title="Sign in"
          onPress={handleSignInWithDiscordPress}
        /> */}
        <Link href="/event/">
          <Typography>event</Typography>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
