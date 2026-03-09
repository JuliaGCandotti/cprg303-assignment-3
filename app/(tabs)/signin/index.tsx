import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../styles/theme";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In Form - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg,
  },
  text: {
    fontSize: 16,
    color: theme.colors.muted,
  },
});
