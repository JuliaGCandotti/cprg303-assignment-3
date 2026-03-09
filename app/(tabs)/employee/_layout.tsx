import { Stack } from "expo-router";
import React from "react";

export default function EmployeeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Employee Information" }} />
    </Stack>
  );
}
