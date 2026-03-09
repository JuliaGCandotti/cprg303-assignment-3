import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from "react-native";
import { z } from "zod";
import { theme } from "../../../styles/theme";

const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters."),
  phone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone number must have at least 10 digits.",
    ),
  postalCode: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      "Please enter a valid Canadian postal code.",
    ),
});

type EmployeeForm = z.infer<typeof employeeSchema>;

export default function EmployeeFormScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      phone: "",
      postalCode: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(data: EmployeeForm) {
    Alert.alert(
      "Employee Saved",
      `${data.firstName} ${data.lastName} has been registered.`,
      [{ text: "OK" }],
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Employee Information</Text>

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="e.g. Jane"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}

      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="e.g. Doe"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
      )}

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
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Department</Text>
      <Controller
        control={control}
        name="department"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.department && styles.inputError]}
            placeholder="e.g. Engineering"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.department && (
        <Text style={styles.error}>{errors.department.message}</Text>
      )}

      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="e.g. (403) 555-0123"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Text style={styles.label}>Postal Code</Text>
      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.postalCode && styles.inputError]}
            placeholder="e.g. T2P 1J9"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
            maxLength={7}
          />
        )}
      />
      {errors.postalCode && (
        <Text style={styles.error}>{errors.postalCode.message}</Text>
      )}

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Save Employee</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    padding: theme.spacing.screen,
    paddingBottom: 40,
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
