import Unauthorized from "@/components/Unauthorized";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Select,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { fetchPOST } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import isValidPassword from "@/utils/validation/is-valid-password";
import BaseLoadingOverlay from "@/components/BaseLoadingOverlay";
import {
  ADMIN_API_URL,
  ADMIN_PAGE,
  BASE_COLORS,
  BASE_LOADING,
} from "@/configs";
import { useForm } from "@mantine/form";
import isValidEmail from "@/utils/validation/is-valid-email";

export default function Register() {
  const router = useRouter();
  const theme = useMantineTheme();

  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validate: {
      name: (value) => isStringEmpty(value) && "Name is required",
      email: (value) =>
        isStringEmpty(value)
          ? "Email is required"
          : !isValidEmail(value) && "Email is not valid",
      role: (value) => isStringEmpty(value) && "Role is required",
      password: (value) => {
        const { valid, message } = isValidPassword(value);
        return !valid && message;
      },
    },
  });

  const handleRegister = (values) => {
    const { validation } = ADMIN_PAGE;
    fetchPOST({
      url: `${ADMIN_API_URL}/user/register?pass=${validation}`,
      body: values,
      setBtnLoading,
      successMessage: "Successfully register user",
    });
  };

  useEffect(() => {
    const { duration } = BASE_LOADING;
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BaseLoadingOverlay />;
  }

  if (router.query.pass !== ADMIN_PAGE.validation) {
    return <Unauthorized />;
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ paddingTop: 50 }}
      gap={20}
    >
      <Title c={BASE_COLORS.gray_text}>Halo Admin</Title>
      <Button
        onClick={() => router.push("/")}
        style={{
          backgroundColor: BASE_COLORS.orange,
          outlineColor: BASE_COLORS.orange,
        }}
      >
        Back to Homepage
      </Button>
      <form
        onSubmit={form.onSubmit(handleRegister)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing.md,
          width: "100%",
        }}
      >
        <TextInput
          spellCheck="false"
          label="Name"
          type="text"
          placeholder="Arif Amin"
          style={{ width: "50%" }}
          {...form.getInputProps("name")}
        />
        <TextInput
          spellCheck="false"
          label="Email"
          type="email"
          placeholder="student"
          style={{ width: "50%" }}
          {...form.getInputProps("email")}
        />
        <TextInput
          spellCheck="false"
          label="Password"
          type="password"
          placeholder="********"
          style={{ width: "50%" }}
          {...form.getInputProps("password")}
        />
        <Select
          label="Role"
          placeholder="Pilih salah satu"
          style={{ width: "50%" }}
          data={[
            { value: "admin", label: "Admin" },
            { value: "dosen", label: "Dosen" },
            { value: "mahasiswa", label: "Mahasiswa" },
          ]}
          {...form.getInputProps("role")}
        />
        <Button
          loading={btnLoading}
          type="submit"
          style={{
            backgroundColor: BASE_COLORS.orange,
            outlineColor: BASE_COLORS.orange,
          }}
        >
          Register
        </Button>
      </form>
    </Flex>
  );
}

Register.noLayout = true;
