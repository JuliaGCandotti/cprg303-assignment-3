import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import { theme } from "../../../styles/theme";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be less than 32 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: "Password must contain at least one special character",
  });

const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters."),
    email: z.string().trim().email("Please enter a valid email address."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = (data: SignUpForm) => {
    Alert.alert("Form Data", JSON.stringify(data, null, 2), [{ text: "OK" }]);
    // Only validate password strength on submit, not on confirm password field
    if (!data.confirmPassword) {
      Alert.alert("Error", "Please confirm your password", [{ text: "OK" }]);
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Sign Up Form - Coming Soon</Text> */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Full Name input */}
      <Text style={styles.label}>Full Name: {errors.fullName?.message}</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="e.g. Jane"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />

      {/* Email input */}
      <Text style={styles.label}>Email: {errors.email?.message}</Text>
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
          />
        )}
      />

      <Text style={styles.label}>Password: {errors.password?.message}</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <Text style={styles.label}>
        Confirm Password: {errors.confirmPassword?.message}
      </Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Re-enter your password"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}> Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.screen,
    backgroundColor: theme.colors.bg,
  },
  text: {
    fontSize: 16,
    color: theme.colors.muted,
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
});
