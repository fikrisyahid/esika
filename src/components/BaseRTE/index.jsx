import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useEffect, useState } from "react";
import Image from "@tiptap/extension-image";
import { Button, Tooltip } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import ImageUpload from "./ImageUpload";

export default function BaseRTE({
  content,
  setContent,
  contentUpdated,
  setContentUpdated,
}) {
  const [uploadImgOpen, setUploadImgOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  editor?.on("update", () => setContent(editor.getHTML()));

  useEffect(() => {
    if (editor && !contentUpdated) {
      editor.commands.setContent(content);
      if (setContentUpdated) {
        setContentUpdated(true);
      }
    }
  }, [content, editor, contentUpdated, setContentUpdated]);

  const handleUploadImage = () => setUploadImgOpen(true);
  const handleCloseUploadImage = () => setUploadImgOpen(false);

  return (
    <>
      <ImageUpload
        open={uploadImgOpen}
        onClose={handleCloseUploadImage}
        editor={editor}
      />
      <Tooltip
        label="Image will be put at the current focus on text editor"
        position="right"
      >
        <Button
          leftIcon={<IconUpload />}
          color="green"
          style={{ alignSelf: "flex-start" }}
          onClick={handleUploadImage}
        >
          Upload Image
        </Button>
      </Tooltip>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
}
