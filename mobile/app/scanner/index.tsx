import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <View>
      <Text>Welcome to Scanner page.</Text>
      <Text style={{ textAlign: "center" }}>QR Code Scanner</Text>
      <View>
        <Pressable onPress={requestPermission}>
          <Text style={{ ...style.linkText, textAlign: "center" }}>
            Request Camera Persmission
          </Text>
        </Pressable>
        <Link href="/camera" asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={{
                ...style.buttonStyle,
                opacity: !isPermissionGranted ? 0.5 : 1,
              }}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  linkText: {
    textDecorationLine: "underline",
    color: "blue",
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "#0e7afe",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    width: 150,
    paddingVertical: 5,
    marginTop: 50,
    marginHorizontal: "auto",
    borderRadius: 10,
  },
});

export default Scanner;
