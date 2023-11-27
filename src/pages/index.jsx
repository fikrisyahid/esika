import BaseLoadingOverlay from "@/components/BaseLoadingOverlay";
import PageWrapper from "@/components/PageWrapper";
import { BASE_COLORS, LOGIN_LOADING, SHARED_API_URL } from "@/configs";
import {
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const theme = useMantineTheme();

  // Loading state, wait for CSS page load
  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (obj) => {
    setPostData((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    const { duration } = LOGIN_LOADING;
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const [btnLoading, setBtnLoading] = useState(false);

  const handleSignIn = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const result = await signIn("credentials", {
      email: postData.email,
      password: postData.password,
      redirect: false,
    });
    if (result?.ok) {
      notifications.show({
        message: "Login successfull",
        color: "green",
      });
      const response = await fetch(
        `${SHARED_API_URL}/user/get?email=${postData.email}`
      );
      const user = await response.json();
      const role = user?.data?.Dosen ? "dosen" : "mahasiswa";
      if (role === "dosen") {
        router.push("/teacher/dashboard");
        return;
      }
      if (role === "mahasiswa") {
        router.push("/student/dashboard");
        return;
      }
    }
    if (result?.error) {
      notifications.show({
        title: "Login failed",
        message: result?.error,
        color: "red",
      });
    }
    setBtnLoading(false);
  };

  if (loading) {
    return <BaseLoadingOverlay />;
  }

  return (
    <PageWrapper pageTitle="Login">
      <Flex style={{ height: "100vh" }}>
        <Flex w="75vw" justify="center" align="center">
          <div style={{ width: "70%", height: "70%", position: "relative" }}>
            <Image
              priority
              src="/img/login-oren.svg"
              alt="Login Background"
              fill
            />
          </div>
        </Flex>
        <Flex
          direction="column"
          align="center"
          w="25vw"
          pl={50}
          pr={50}
          pt={40}
          style={{ backgroundColor: BASE_COLORS.green }}
        >
          <Title
            color="white"
            align="center"
            fw="bolder"
            style={{ fontSize: 50 }}
          >
            Esika
          </Title>
          <Text color="white" align="center" fw="lighter" size="lg">
            E-Learning app for students
          </Text>
          <form
            onSubmit={handleSignIn}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Flex style={{ flexGrow: 1 }} />
            <TextInput
              spellCheck="false"
              label="Email"
              type="email"
              placeholder="Masukkan Email"
              value={postData.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              styles={{
                label: {
                  color: "white",
                },
                input: {
                  color: BASE_COLORS.gray_text,
                },
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="********"
              value={postData.password}
              mb={50}
              onChange={(e) => handleChange({ password: e.target.value })}
              styles={{
                label: {
                  color: "white",
                },
                innerInput: {
                  color: BASE_COLORS.gray_text,
                },
              }}
            />
            <Flex style={{ flexGrow: 1 }} />
            <Button
              size="lg"
              type="submit"
              loading={btnLoading}
              mb={100}
              style={{
                backgroundColor: BASE_COLORS.orange,
                outlineColor: BASE_COLORS.orange,
                borderRadius: theme.radius.md,
              }}
            >
              Login
            </Button>
          </form>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

Index.noLayout = true;
