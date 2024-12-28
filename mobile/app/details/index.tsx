import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

const Details = () => {
  return (
    <View style={style.container}>
      <Text>Welcome to Setting Details</Text>
      <Link style={style.linkText} href="/">
        Go to Home
      </Link>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default Details;
