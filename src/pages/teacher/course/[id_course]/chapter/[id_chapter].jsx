import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { fetchPUT } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import isStringEmpty from "@/utils/validation/is-string-empty";
import isValidURL from "@/utils/validation/is-valid-url";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderInfo from "@/components/pages/teacher/course/detail/chapter/HeaderInfo";
import ChapterContent from "@/components/pages/teacher/course/detail/chapter/ChapterContent";

export default function DetailChapterPage() {
  const { isDev } = getDevStatus();

  const router = useRouter();
  const {
    id_course: idCourse,
    id_chapter: idChapter,
    from_quiz: fromQuiz,
  } = router.query;

  const {
    data: chapter,
    isLoading: chapterLoading,
    mutate: chapterMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/chapter/get?id=${idChapter}`,
  });

  const {
    data: quiz,
    isLoading: quizLoading,
    mutate: quizMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/quiz/get?without_chapter=true`,
  });

  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => setEditMode(true);
  const handleCancelEdit = () => setEditMode(false);

  const onSuccess = () => {
    handleCancelEdit();
    chapterMutate();
  };

  const [content, setContent] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      video_link: "",
    },
    validate: {
      title: (value) => isStringEmpty(value) && "Title is required",
      video_link: (value) =>
        !isStringEmpty(value) &&
        !isValidURL(value) &&
        "Video link is not valid",
    },
  });

  useEffect(() => {
    if (chapter?.statusCode === 200) {
      form.setValues({
        title: chapter.data.title,
        video_link: chapter.data.video_link,
      });
      setContent(chapter.data.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);

  const handleEditChapter = (values) => {
    fetchPUT({
      body: {
        ...values,
        id_chapter: idChapter,
        course_id: idCourse,
        content,
      },
      url: `${TEACHER_API_URL}/chapter/edit`,
      successMessage: "Chapter edited successfully",
      onSuccess,
      setBtnLoading,
    });
  };

  const pageState = DataLoadCheck({
    data: [chapter, quiz],
    isLoading: [chapterLoading, quizLoading],
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail Chapter">
        <MainCard>
          <form onSubmit={form.onSubmit(handleEditChapter)}>
            <Stack spacing="sm">
              <HeaderInfo
                btnLoading={btnLoading}
                chapter={chapter}
                quizzes={quiz}
                editMode={editMode}
                handleCancelEdit={handleCancelEdit}
                handleEditMode={handleEditMode}
                fromQuiz={fromQuiz}
                idCourse={idCourse}
                mutate={() => {
                  chapterMutate();
                  quizMutate();
                }}
              />
              <ChapterContent
                chapter={chapter}
                content={content}
                editMode={editMode}
                form={form}
                setContent={setContent}
              />
            </Stack>
          </form>
        </MainCard>
        {isDev && (
          <MainCard>
            <PrettyJSON json={chapter} />
          </MainCard>
        )}
      </PageWrapper>
    )
  );
}
