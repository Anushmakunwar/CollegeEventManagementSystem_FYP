import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useColorScheme } from "@/hooks/useColorScheme";
import TanstackProvider from "../providers/TanstackProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TanstackProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="unavailable/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="camera/index" options={{ headerShown: false }} />
          <Stack.Screen name="scanner/index" options={{ headerShown: false }} />

          {/* <Stack.Screen name="student/index" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="admin/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="admin/event/new/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="admin/event/list/[key]"
            options={{ headerShown: false, title: "Event List" }}
          />
          <Stack.Screen
            name="admin/event/[id]"
            options={{ headerShown: false, title: "Event Details" }}
          /> */}
          {/* <Stack.Screen
            name="student/event"
            options={{ headerShown: false, title: "All Events" }}
          />
          <Stack.Screen
            name="student/event/list/[key]"
            options={{ headerShown: false, title: "Event List" }}
          />
          <Stack.Screen
            name="student/event/[id]"
            options={{ headerShown: false, title: "Event Details" }}
          />

          <Stack.Screen name="details/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings/index"
            options={{ headerShown: false }}
          />
          */}
          <Stack.Screen
            name="student/(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="admin/(tabs)/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="admin/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </ThemeProvider>
    </TanstackProvider>
  );
}
