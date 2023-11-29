import { Button, Flex, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import MainCard from "../MainCard";

export default function SiswaCard({
  id,
  no,
  nama,
  nim,
  btnLoading,
  handleAddStudent,
}) {
  return (
    <MainCard>
      <Flex align="center" justify="space-between">
        <Flex gap="sm">
          {no && (
            <Text size={18} style={{ fontWeight: "bold" }}>
              {no}.
            </Text>
          )}
          <Stack>
            <Text size={18}>{nama}</Text>
            <Text size={18} mt={-15}>
              {nim}
            </Text>
          </Stack>
        </Flex>
        <Button
          color="orange"
          leftIcon={<IconPlus />}
          loading={btnLoading}
          onClick={() => handleAddStudent({ mahasiswaId: id })}
        >
          Tambah ke kelas
        </Button>
      </Flex>
    </MainCard>
  );
}
