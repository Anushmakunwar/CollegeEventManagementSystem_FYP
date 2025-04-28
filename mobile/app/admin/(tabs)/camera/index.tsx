import { CameraView } from "expo-camera";
import { Stack, router } from "expo-router";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";

interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
}

interface QrData {
  userId: string;
  eventId: string;
}

export default function Camera() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
        setIsScanning(true);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const parseQrData = (data: string): QrData => {
    try {
      return data
        .replace(/{|}/g, "")
        .split(",")
        .reduce((acc, pair) => {
          const [key, value] = pair.split(":");
          acc[key.trim()] = value.trim();
          return acc;
        }, {} as QrData);
    } catch (error) {
      throw new Error("Invalid QR code format");
    }
  };

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (!data || qrLock.current || !isScanning) return;

    qrLock.current = true;
    setIsScanning(false);

    try {
      const cleanedData = parseQrData(data);
      const requestBody = {
        userId: cleanedData.userId,
        eventId: cleanedData.eventId,
      };

      console.log("Sending request:", requestBody);

      const response = await fetch(
        "http://192.168.1.191:3333/api/v1/events",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update event");
      }

      Alert.alert("Success", "QR Code processed successfully!", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/");
          },
        },
      ]);
    } catch (error: any) {
      const errorMessage =
        error.message === "Invalid QR code format"
          ? "Invalid QR code. Please scan a valid QR code."
          : error.message || "An unexpected error occurred.";
      Alert.alert("Error", errorMessage, [
        {
          text: "OK",
          onPress: () => {
            setIsScanning(true);
            qrLock.current = false;
          },
        },
      ]);
      console.error("QR Scan Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Camera", headerShown: false }} />
      {Platform.OS === "android" && <StatusBar hidden />}
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
      />
      <Overlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
});
