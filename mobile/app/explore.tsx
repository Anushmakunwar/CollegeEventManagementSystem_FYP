import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import React from "react";

const Explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Explore</Text>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
});
