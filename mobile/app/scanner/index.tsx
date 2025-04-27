import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900 justify-center items-center p-6">
      <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Welcome to Scanner
      </Text>
      <Text className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        QR Code Scanner
      </Text>

      <Pressable onPress={requestPermission} className="mb-6">
        <Text className="text-blue-600 dark:text-blue-400 underline text-base font-medium">
          Request Camera Permission
        </Text>
      </Pressable>

      <Link href="/camera/index" asChild>
        <Pressable
          disabled={!isPermissionGranted}
          className={`bg-blue-600 dark:bg-blue-700 rounded-xl py-3 px-6 w-48 ${
            !isPermissionGranted ? "opacity-50" : "opacity-100"
          }`}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Scan Code
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Scanner;