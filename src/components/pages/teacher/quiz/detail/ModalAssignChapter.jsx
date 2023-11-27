import isStringEmpty from "@/utils/validation/is-string-empty";
import { Modal, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import NoData from "@/components/NoData";
import TableAssignChapter from "./TableAssignChapter";

export default function ModalAssignChapter({
  assignOpen,
  handleAssignClose,
  quiz,
  chapters,
  mutate,
}) {
  const form = useForm({
    initialValues: {
      chapter: "",
    },
    validate: {
      chapter: (value) =>
        isStringEmpty(value) && "Please enter the correct quiz code",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handleAssignClose();
  };

  const onSuccess = () => {
    mutate();
    handleCloseModal();
  };

  const givenChapters = quiz?.Chapter
    ? [
        {
          id: quiz?.Chapter?.id,
          title: quiz?.Chapter?.title,
          course: {
            title: quiz?.Chapter?.course?.title,
          },
        },
        ...chapters,
      ]
    : chapters;

  return (
    <Modal
      opened={assignOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="xl"
      xOffset={0}
    >
      <Stack spacing="sm">
        <Title size={20}>Assign chapter to quiz</Title>
        {givenChapters?.length === 0 ? (
          <NoData text="No chapters available" />
        ) : (
          <TableAssignChapter
            onSuccess={onSuccess}
            quiz={quiz}
            chapters={givenChapters}
            mutate={mutate}
          />
        )}
      </Stack>
    </Modal>
  );
}
