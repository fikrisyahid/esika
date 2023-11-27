import { uploadImg } from "@/utils/cloudinary/upload-img";
import {
  Button,
  Center,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageUpload({ open, onClose, editor }) {
  const theme = useMantineTheme();

  const [file, setFile] = useState(null);
  const [localImg, setLocalImg] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLocalImg(e.target.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleCancelImage = () => {
    setFile(null);
    setLocalImg(null);
  };

  const onSuccessUpload = (result) => {
    editor?.commands.setImage({ src: result.data });
    onClose();
    handleCancelImage();
  };

  const handleUploadImage = async () => {
    try {
      setBtnLoading(true);
      const result = await uploadImg(file);
      if (result.status === "success") {
        onSuccessUpload(result);
      }
      if (result.status !== "success") {
        throw new Error(result.error);
      }
      notifications.show({
        title: "Success",
        message: "Image uploaded successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
    setBtnLoading(false);
  };

  const uploadImageState = (
    <Dropzone
      onDrop={(files) => setFile(files[0])}
      maxSize={5 * 1024 ** 2}
      maxFiles={1}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Please select an image file, the file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );

  const previewImageState = (
    <Stack spacing="sm">
      <Title size={25}>Preview Image</Title>
      <Center>
        {localImg && (
          <Image alt="gambar" src={localImg} width={480} height={270} />
        )}
      </Center>
      <Group grow>
        <Button
          leftIcon={<IconUpload />}
          color="green"
          onClick={handleUploadImage}
          loading={btnLoading}
        >
          Upload
        </Button>
        <Button color="orange" onClick={handleCancelImage}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );

  return (
    <Modal
      xOffset={0}
      opened={open}
      centered
      withCloseButton={false}
      size="lg"
      onClose={onClose}
    >
      {file ? previewImageState : uploadImageState}
    </Modal>
  );
}
