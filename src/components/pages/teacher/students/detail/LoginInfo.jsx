import { TEACHER_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import getProfileImg from "@/utils/get-profile-img";
import getRankColor from "@/utils/get-rank-color";
import isValidPassword from "@/utils/validation/is-valid-password";
import {
  Badge,
  Button,
  Code,
  Group,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function LoginInfo({ idStudent, student }) {
  const [editMode, setEditMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      retypePassword: "",
    },
    validate: {
      password: (value) => {
        const { valid, message } = isValidPassword(value);
        return !valid && message;
      },
      retypePassword: (value, values) =>
        value !== values.password && "Password does not match",
    },
  });

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    form.reset();
  };

  const handleChangePassword = (values) => {
    fetchPUT({
      body: values,
      successMessage: "Password changed successfully",
      url: `${TEACHER_API_URL}/user/student?id=${idStudent}`,
      onSuccess: handleCancel,
      setBtnLoading,
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleChangePassword)}>
      <Stack spacing="sm">
        <Stack align="center" spacing="sm">
          <Image
            alt="profile-pict"
            src={getProfileImg(student?.data?.username)}
            width={170}
            height={170}
          />
          <Text size="lg" fw="bold" mt={-15}>
            {student?.data?.name}
          </Text>
          <Badge size="lg" color={getRankColor(student?.data?.user_rank)}>
            {student?.data?.user_rank}
          </Badge>
          <Code>username: {student?.data?.username}</Code>
        </Stack>
        {!editMode && (
          <Button
            mt={5}
            style={{ alignSelf: "center" }}
            color="orange"
            leftIcon={<IconEdit />}
            onClick={handleEdit}
            size="sm"
          >
            Change password
          </Button>
        )}
        {editMode && (
          <>
            <PasswordInput
              label="New Password"
              placeholder="******"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Re-type New Password"
              placeholder="******"
              {...form.getInputProps("retypePassword")}
            />
            <Group mt={5} position="center">
              <Button
                color="green"
                type="submit"
                loading={btnLoading}
                size="sm"
              >
                Apply
              </Button>
              <Button color="orange" onClick={handleCancel} size="sm">
                Cancel
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </form>
  );
}
