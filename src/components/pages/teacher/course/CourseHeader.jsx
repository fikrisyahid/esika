import { Badge, Button, Group, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPublishCourse from "./ModalPublishCourse";

export default function CourseHeader({ course, mutate }) {
  const router = useRouter();

  const [publishOpen, setPublishOpen] = useState(false);

  const handlePublishOpen = () => setPublishOpen(true);
  const handlePublishClose = () => setPublishOpen(false);
  const handleBack = () => router.push(`/teacher/course`);

  const isPublished = course?.data?.published;
  const publishedCourseData = {
    id: course?.data?.id,
    title: course?.data?.title,
  };

  return (
    <Group position="apart">
      <Group position="left">
        <Button leftIcon={<IconArrowLeft />} onClick={handleBack} color="dark">
          Back
        </Button>
        <Title>Detail Course</Title>
        <Badge mt={5} size="lg" color={isPublished ? "violet" : "orange"}>
          {isPublished ? "PUBLISHED" : "DRAFT"}
        </Badge>
      </Group>
      <ModalPublishCourse
        publishOpen={publishOpen}
        mutate={mutate}
        handlePublishClose={handlePublishClose}
        publishCourseData={publishedCourseData}
      />
      {!isPublished && (
        <Button onClick={handlePublishOpen} color="violet">
          Publish Course
        </Button>
      )}
    </Group>
  );
}
