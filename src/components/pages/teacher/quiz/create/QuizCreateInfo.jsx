import formCheckboxChange from "@/utils/form/form-checkbox-change";
import formNumberChange from "@/utils/form/form-number-change";
import {
  ActionIcon,
  Checkbox,
  Group,
  Select,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconHelpCircleFilled } from "@tabler/icons-react";

export default function QuizCreateInfo({ form }) {
  return (
    <>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Quiz title"
        {...form.getInputProps("title")}
      />
      <Group spacing={5}>
        <Checkbox
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
        label="Quiz difficulty"
        placeholder="Pick one"
        data={[
          { value: "EASY", label: "EASY" },
          { value: "MEDIUM", label: "MEDIUM" },
          { value: "HARD", label: "HARD" },
        ]}
        {...form.getInputProps("difficulty")}
      />
    </>
  );
}
