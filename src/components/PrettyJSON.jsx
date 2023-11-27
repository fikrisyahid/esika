import { Prism } from "@mantine/prism";

export default function PrettyJSON({ json }) {
  return (
    <Prism language="json" withLineNumbers>
      {JSON.stringify(json || "", null, 2)}
    </Prism>
  );
}
