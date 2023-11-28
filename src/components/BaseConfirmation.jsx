import { Alert, Button, Modal, Stack, Text } from "@mantine/core";

export default function BaseConfirmation({
  open,
  onClose,
  icon,
  title,
  color,
  message,
  btnIcon,
  btnOnClick,
  btnLoading,
  btnText,
}) {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <Stack spacing="sm">
        <Alert icon={icon} title={title} color={color}>
          {message?.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={index}>{item}</Text>
          ))}
        </Alert>
        <Button
          loading={btnLoading}
          color="red"
          leftIcon={btnIcon}
          onClick={btnOnClick}
        >
          {btnText}
        </Button>
      </Stack>
    </Modal>
  );
}
