import BaseRTE from "@/components/BaseRTE";
import PrettyJSON from "@/components/PrettyJSON";
import getDevStatus from "@/utils/get-dev-status";
import isStringEmpty from "@/utils/validation/is-string-empty";
import {
  Alert,
  Button,
  Flex,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function ModalEditQuestion({
  open,
  onClose,
  questionId,
  questions,
  setQuestions,
}) {
  const { isDev } = getDevStatus();

  const [randomValue, setRandomValue] = useState(0); // re-render base rte

  const [localQuestion, setLocalQuestion] = useState({
    title: "",
    type: "MULTIPLE_CHOICE",
    hint: "",
    options: ["This is option A"],
    answer: "",
  });
  const localQuestionValidation = [
    isStringEmpty(localQuestion.title),
    isStringEmpty(localQuestion.answer),
    localQuestion.options.length === 1 &&
      isStringEmpty(localQuestion.options[0]),
  ];
  const optionsLabel = ["A", "B", "C", "D"];

  useEffect(() => {
    if (questionId) {
      setLocalQuestion(
        questions.find((question) => question.id === questionId)
      );
    }
  }, [questions, questionId]);

  const handleResetLocalQuestion = () => {
    setRandomValue((old) => old + 1);
    setLocalQuestion({
      title: "",
      type: "MULTIPLE_CHOICE",
      hint: "",
      options: ["This is option A"],
      answer: "",
    });
  };

  const handleOnCloseLocal = () => {
    onClose();
    handleResetLocalQuestion();
  };

  const handleEditQuestion = () => {
    // Validation
    const errors = localQuestionValidation.map((validation) => validation);
    if (errors.some((error) => error)) {
      notifications.show({
        message: "Please fill in all required fields",
        color: "red",
      });
      return;
    }

    // Update question
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === questionId
    );
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex] = localQuestion;
    setQuestions(newQuestions);
    handleOnCloseLocal();
  };

  const handleChange = (obj) => {
    setLocalQuestion((old) => ({
      ...old,
      ...obj,
    }));
  };

  /**
   * Handles the change of options in the localQuestion state.
   * If the new number of options is greater than the current number of options,
   * it adds new options to the localQuestion state with default labels.
   * If the new number of options is less than the current number of options,
   * it removes the excess options from the localQuestion state.
   * @param {number} e - The new number of options.
   * @returns {void}
   */
  const handleChangeOptions = (e) => {
    if (e > localQuestion.options.length) {
      const newOptions = [...localQuestion.options];
      const diff = e - localQuestion.options.length;
      Array(diff)
        .fill("")
        .forEach((_, index) => {
          newOptions.push(`This is option ${optionsLabel[index + 1]}`);
        });
      handleChange({ options: newOptions });
      return;
    }
    handleChange({ options: localQuestion.options.slice(0, e) });
  };

  return (
    <Modal
      opened={open}
      onClose={handleOnCloseLocal}
      withCloseButton={false}
      centered
      size="xl"
      xOffset={0}
    >
      <Stack spacing="sm">
        <BaseRTE
          key={randomValue}
          content={localQuestion.title}
          setContent={(e) => handleChange({ title: e })}
        />
        <Flex gap="xs">
          <Select
            w="100%"
            withAsterisk
            label="Type"
            placeholder="Pick one"
            value={localQuestion.type}
            data={[
              { value: "MULTIPLE_CHOICE", label: "Multiple choice" },
              { value: "TRUE_FALSE", label: "True or false" },
              { value: "SHORT_ANSWER", label: "Short answer" },
              { value: "VOICE_RECORDING", label: "Voice recording" },
            ]}
            onChange={(e) => {
              handleChange({ type: e });
              handleChange({ answer: "" });
              handleChange({ options: ["This is option A"] });
            }}
          />
          {localQuestion.type === "MULTIPLE_CHOICE" && (
            <Select
              withAsterisk
              label="Options Amount"
              placeholder="1"
              defaultValue={1}
              onChange={handleChangeOptions}
              data={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
              ]}
            />
          )}
        </Flex>
        {["SHORT_ANSWER", "VOICE_RECORDING"].includes(localQuestion.type) && (
          <TextInput
            withAsterisk
            label="Answer"
            placeholder="Question answer"
            value={localQuestion.answer}
            onChange={(e) => handleChange({ answer: e.target.value })}
          />
        )}
        {localQuestion.type === "TRUE_FALSE" && (
          <Select
            withAsterisk
            label="Answer"
            placeholder="Question answer"
            value={localQuestion.answer}
            data={[
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]}
            onChange={(e) => handleChange({ answer: e })}
          />
        )}
        {localQuestion.type === "MULTIPLE_CHOICE" && (
          <>
            <Alert icon={<IconAlertCircle />} title="Info" radius="md" p={5}>
              Options must be unique
            </Alert>
            {localQuestion.options?.map((option, index) => (
              <Flex key={v4()} gap="xs" align="center">
                <Text>{optionsLabel[index]}</Text>
                <TextInput
                  value={option}
                  w="100%"
                  onChange={(e) => {
                    const newOptions = [...localQuestion.options];
                    newOptions[index] = e.target.value;
                    handleChange({ options: newOptions });
                  }}
                />
              </Flex>
            ))}
            <Select
              withAsterisk
              label="Answer"
              placeholder="Question answer"
              value={localQuestion.answer}
              data={localQuestion.options.map((option, index) => ({
                value: option,
                label: optionsLabel[index],
              }))}
              onChange={(e) => handleChange({ answer: e })}
            />
          </>
        )}
        <TextInput
          label="Hint (optional)"
          placeholder="Question hint"
          value={localQuestion.hint}
          onChange={(e) => handleChange({ hint: e.target.value })}
        />
        <Button color="violet" onClick={handleEditQuestion}>
          Edit question
        </Button>
        {isDev && <PrettyJSON json={localQuestion} />}
      </Stack>
    </Modal>
  );
}
