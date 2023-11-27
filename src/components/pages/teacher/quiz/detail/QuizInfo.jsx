import { profile } from "@/atoms";
import { TEACHER_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import formCheckboxChange from "@/utils/form/form-checkbox-change";
import formNumberChange from "@/utils/form/form-number-change";
import isStringEmpty from "@/utils/validation/is-string-empty";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconHelpCircleFilled } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function QuizInfo({ quiz, mutate }) {
  const [btnLoading, setBtnLoading] = useState(false);

  const user = useAtomValue(profile);

  const [editMode, setEditMode] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      timeLimit: "0",
      timeLimitRequired: false,
      minimumScore: "0",
      minimumScoreRequired: false,
      difficulty: "EASY",
    },
    validate: {
      title: (value) => isStringEmpty(value) && "Title is required",
      timeLimit: (value, { timeLimitRequired }) =>
        timeLimitRequired && value === "0" && "Time limit is required",
      minimumScore: (value, { minimumScoreRequired }) =>
        minimumScoreRequired && value === "0" && "Minimum score is required",
    },
  });

  const handleResetForm = () => {
    form.setValues({
      title: quiz?.data?.title || "",
      timeLimit: quiz?.data?.time_limit || "0",
      timeLimitRequired: !!quiz?.data?.time_limit,
      minimumScore: quiz?.data?.minimum_score || "0",
      minimumScoreRequired: !!quiz?.data?.minimum_score,
      difficulty: quiz?.data?.quiz_difficulty || "EASY",
    });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    handleResetForm();
  };

  useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  const handleUpdateQuiz = (values) => {
    fetchPUT({
      url: `${TEACHER_API_URL}/quiz/update`,
      body: {
        ...values,
        id: quiz?.data?.id,
        teacher_id: user.id,
        timeLimit: parseInt(values.timeLimit),
        minimumScore: parseInt(values.minimumScore),
      },
      setBtnLoading,
      successMessage: "Quiz updated successfully",
      onSuccess: () => {
        setEditMode(false);
        mutate();
      },
    });
  };

  const isPublished = quiz?.data?.published;

  return (
    <form onSubmit={form.onSubmit(handleUpdateQuiz)}>
      <Stack spacing="xs">
        <TextInput
          disabled={!editMode}
          withAsterisk
          label="Title"
          placeholder="Quiz title"
          {...form.getInputProps("title")}
        />
        <Group spacing={5}>
          <Checkbox
            disabled={!editMode}
            color="dark"
            label="With time limit"
            {...form.getInputProps("timeLimitRequired", {
              type: "checkbox",
            })}
            value={form.values.timeLimitRequired}
            onChange={(e) => {
              formCheckboxChange({
                e,
                form,
                checkField: "timeLimitRequired",
                toChangeField: "timeLimit",
              });
            }}
          />
          <Tooltip
            position="right"
            label="The time limit for students to finish this quiz once they start it"
          >
            <ActionIcon color="dark">
              <IconHelpCircleFilled />
            </ActionIcon>
          </Tooltip>
        </Group>
        {form.getInputProps("timeLimitRequired").value && (
          <TextInput
            disabled={!editMode}
            withAsterisk
            label="Time Limit (minutes)"
            placeholder="Quiz time limit"
            type="number"
            {...form.getInputProps("timeLimit")}
            value={form.values.timeLimit}
            onChange={(e) =>
              formNumberChange({
                e,
                form,
                field: "timeLimit",
              })
            }
          />
        )}
        <Group spacing={5}>
          <Checkbox
            disabled={!editMode}
            color="dark"
            label="With minimum score"
            {...form.getInputProps("minimumScoreRequired", {
              type: "checkbox",
            })}
            value={form.values.minimumScoreRequired}
            onChange={(e) => {
              formCheckboxChange({
                e,
                form,
                checkField: "minimumScoreRequired",
                toChangeField: "minimumScore",
              });
            }}
          />
          <Tooltip position="right" label="The minimum score for this quiz">
            <ActionIcon color="dark">
              <IconHelpCircleFilled />
            </ActionIcon>
          </Tooltip>
        </Group>
        {form.getInputProps("minimumScoreRequired").value && (
          <TextInput
            disabled={!editMode}
            withAsterisk
            label="Minimum score"
            placeholder="Quiz minimum score"
            type="number"
            {...form.getInputProps("minimumScore")}
            value={form.values.minimumScore}
            onChange={(e) =>
              formNumberChange({
                e,
                form,
                field: "minimumScore",
              })
            }
          />
        )}
        <Select
          disabled={!editMode}
          label="Quiz difficulty"
          placeholder="Pick one"
          data={[
            { value: "EASY", label: "EASY" },
            { value: "MEDIUM", label: "MEDIUM" },
            { value: "HARD", label: "HARD" },
          ]}
          {...form.getInputProps("difficulty")}
        />
        {!editMode && (
          <Button
            mt={10}
            disabled={isPublished}
            style={{ alignSelf: "flex-end" }}
            color="orange"
            leftIcon={<IconEdit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
        {editMode && (
          <Group position="right">
            <Button color="green" loading={btnLoading} type="submit">
              Apply
            </Button>
            <Button color="orange" onClick={handleCancel}>
              Cancel
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
}
