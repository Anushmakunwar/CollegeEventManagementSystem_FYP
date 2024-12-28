import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

const style = StyleSheet.create({
  linkText: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link style={style.linkText} href="/details">
        Go to Details Page
      </Link>
      <Link style={style.linkText} href="/settings">
        Go to Settings Page
      </Link>
      <Link style={style.linkText} href="/scanner">
        Go to Scanner Page
      </Link>
    </View>
  );
}
