import BaseRTE from "@/components/BaseRTE";
import BaseStringHTML from "@/components/BaseStringHTML";
import isValidURL from "@/utils/validation/is-valid-url";
import { Center, TextInput, Title } from "@mantine/core";
import React from "react";
import ReactPlayer from "react-player";

export default function ChapterContent({
  editMode,
  chapter,
  form,
  content,
  setContent,
}) {
  if (!editMode) {
    return (
      <>
        <Title size={25} mt="sm" align="center">
          {chapter?.data?.title}
        </Title>
        {isValidURL(chapter?.data?.video_link) && (
          <Center>
            <ReactPlayer controls url={chapter?.data?.video_link} />
          </Center>
        )}
        <BaseStringHTML htmlString={chapter?.data?.content} />
      </>
    );
  }

  return (
    <>
      <TextInput
        label="Title"
        placeholder="Title of the chapter"
        {...form.getInputProps("title")}
      />
      <TextInput
        label="Video link (optional) - Video will be placed on top of chapter"
        placeholder="Link for the video"
        {...form.getInputProps("video_link")}
      />
      <Title size={25} mt="sm">
        Chapter Content
      </Title>
      <BaseRTE content={content} setContent={setContent} />
    </>
  );
}
