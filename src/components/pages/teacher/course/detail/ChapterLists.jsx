import NoData from "@/components/NoData";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { TEACHER_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import ModalDeleteChapter from "./ModalDeleteChapter";
import ChapterCard from "./ChapterCard";

export default function ChapterLists({ course, mutate }) {
  const router = useRouter();

  const { id_course: idCourse } = router.query;

  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteChapterData, setDeleteChapterData] = useState({
    id: "",
    title: "",
  });

  const handleDeleteOpen = ({ id, title }) => {
    setDeleteChapterData({ id, title });
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleClickDetail = (idChapter) =>
    router.push(`/teacher/course/${idCourse}/chapter/${idChapter}`);

  const handleMoveChapter = ({ direction, idChapter }) => {
    fetchPUT({
      body: {
        direction,
        id_chapter: idChapter,
        id_course: idCourse,
      },
      url: `${TEACHER_API_URL}/chapter/move`,
      successMessage: "Chapter moved successfully",
      onSuccess: () => mutate(),
      setBtnLoading,
    });
  };

  // Page data
  const isPublished = course?.data?.published;
  const chapterLength = course?.data?.Chapter.length;
  const chapters = course?.data?.Chapter;

  if (chapterLength === 0) {
    return <NoData />;
  }

  return (
    <>
      <ModalDeleteChapter
        deleteOpen={deleteOpen}
        handleDeleteClose={handleDeleteClose}
        deleteChapterData={deleteChapterData}
        mutate={mutate}
      />
      {!isPublished && (
        <Alert
          icon={<IconAlertCircle />}
          title="Info"
          radius="md"
          variant="filled"
        >
          Once you publish your course, you will not be able to add and delete
          chapter or update the existing chapter&apos;s position.
        </Alert>
      )}
      {isPublished && (
        <Alert
          icon={<IconAlertCircle />}
          title="Info"
          radius="md"
          variant="filled"
          color="yellow"
        >
          You have published your course, you will not be able to add and delete
          chapter or update the existing chapter&apos;s position.
        </Alert>
      )}
      {chapters?.map((chapter, index) => (
        <ChapterCard
          btnLoading={btnLoading}
          chapter={chapter}
          chapterLength={chapterLength}
          handleClickDetail={handleClickDetail}
          handleDeleteOpen={handleDeleteOpen}
          handleMoveChapter={handleMoveChapter}
          index={index}
          isPublished={isPublished}
          key={chapter.id}
        />
      ))}
    </>
  );
}
