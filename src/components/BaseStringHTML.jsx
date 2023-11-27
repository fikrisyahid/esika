import { TypographyStylesProvider } from "@mantine/core";

export default function BaseStringHTML({ htmlString }) {
  return (
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </TypographyStylesProvider>
  );
}
