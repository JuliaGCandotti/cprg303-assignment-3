import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { theme } from "../../../styles/theme";

// ─── Password Schema (same as Sign Up) ───────────────────────────────────────
const passwordSchema = z
  .string()
  .min(1, "Password is required.")
  .min(8, "Password must be at least 8 characters long.")
  .max(32, "Password must be less than 32 characters.")


const SignInSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: passwordSchema,
});

type SignInForm = z.infer<typeof SignInSchema>;


export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = (data: SignInForm) => {
    Alert.alert("Form Data", JSON.stringify(data, null, 2), [{ text: "OK" }]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign In</Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="e.g. jane.doe@company.com"
              placeholderTextColor={theme.colors.muted}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View
              style={[
                styles.input,
                styles.passwordRow,
                errors.password && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.muted}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.toggle}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.screen,
    backgroundColor: theme.colors.bg,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 12,
    fontSize: 15,
    color: theme.colors.text,
    backgroundColor: theme.colors.card,
    marginBottom: 4,
  },
  inputError: {
    borderColor: theme.colors.error,
    backgroundColor: "#fff5f5",
  },
  error: {
    fontSize: 12,
    color: theme.colors.error,
    marginBottom: 12,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
  },
  toggle: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  footerLink: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "600",
  },
});