import { Button, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import NoData from "@/components/NoData";
import { useState } from "react";
import getDevStatus from "@/utils/get-dev-status";
import PrettyJSON from "@/components/PrettyJSON";
import MainCard from "@/components/MainCard";
import QuestionCard from "./QuestionCard";
import ModalDeleteQuestion from "./ModalDeleteQuestion";
import ModalEditQuestion from "./ModalEditQuestion";
import ModalAddQuestionDetail from "./ModalAddQuestionDetail";

export default function QuestionLists({ published, questions, mutate }) {
  const { isDev } = getDevStatus();

  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [deleteQuestionID, setDeleteQuestionID] = useState("");
  const [deleteQuestionOpen, setDeleteQuestionOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");

  const handleOpenAddQuestion = () => setOpenAddQuestion(true);
  const handleCloseAddQuestion = () => setOpenAddQuestion(false);
  const handleOpenEditQuestion = (id) => {
    setOpenEditQuestion(true);
    setSelectedQuestionId(id);
  };
  const handleCloseEditQuestion = () => {
    setOpenEditQuestion(false);
    setSelectedQuestionId("");
  };
  const handleOpenDeleteQuestion = (id) => {
    setDeleteQuestionID(id);
    setDeleteQuestionOpen(true);
  };
  const handleCloseDeleteQuestion = () => {
    setDeleteQuestionID("");
    setDeleteQuestionOpen(false);
  };

  return (
    <>
      <ModalAddQuestionDetail
        open={openAddQuestion}
        onClose={handleCloseAddQuestion}
        mutate={mutate}
      />
      <ModalEditQuestion
        open={openEditQuestion}
        onClose={handleCloseEditQuestion}
        questionId={selectedQuestionId}
        questions={questions}
        mutate={mutate}
      />
      <ModalDeleteQuestion
        deleteQuestionID={deleteQuestionID}
        deleteQuestionOpen={deleteQuestionOpen}
        handleCloseDeleteQuestion={handleCloseDeleteQuestion}
        mutate={mutate}
      />
      <Group position="apart" mt="md">
        <Title size={25}>Question Lists</Title>
        <Button
          disabled={published}
          leftIcon={<IconPlus />}
          color="dark"
          onClick={handleOpenAddQuestion}
        >
          Add new question
        </Button>
      </Group>
      {questions.length === 0 && <NoData text="No question available" />}
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          id={question.id}
          number={index + 1}
          title={question.title}
          type={question.type}
          published={published}
          handleOpenEditQuestion={handleOpenEditQuestion}
          handleOpenDeleteQuestion={handleOpenDeleteQuestion}
        />
      ))}
      {isDev && (
        <MainCard>
          <PrettyJSON json={questions} />
        </MainCard>
      )}
    </>
  );
}
