import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Modal, Stack, Text } from "@mantine/core";
import { fetchPOST } from "@/utils/crud";
import { useState } from "react";
import SiswaCard from "./SiswaCard";

export default function AddStudentDialog({
  open,
  onClose,
  kelasId,
  kelasMutate,
}) {
  const {
    data: siswa,
    isLoading: siswaLoading,
    mutate: siswaMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/mahasiswa?kelas_id=${kelasId}`,
  });

  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessAddStudent = () => {
    siswaMutate();
    kelasMutate();
    onClose();
  };

  const handleAddStudent = async ({ mahasiswaId }) => {
    fetchPOST({
      url: `${TEACHER_API_URL}/nilai`,
      body: {
        kelas_id: kelasId,
        mahasiswa_id: mahasiswaId,
      },
      setBtnLoading,
      successMessage: "Berhasil menambahkan mahasiswa ke kelas",
      onSuccess: onSuccessAddStudent,
    });
  };

  const componentState = DataLoadCheck({
    data: siswa,
    isLoading: siswaLoading,
  });

  return (
    componentState ?? (
      <Modal
        opened={open}
        onClose={onClose}
        withCloseButton={false}
        size="lg"
        centered
      >
        <Stack>
          <Text size={24}>Tambah mahasiswa</Text>
          {siswa?.data?.map((item, index) => (
            <SiswaCard
              key={item.id}
              id={item.id}
              no={index + 1}
              nama={item?.user?.nama}
              nim={item?.NIM}
              btnLoading={btnLoading}
              handleAddStudent={handleAddStudent}
            />
          ))}
        </Stack>
      </Modal>
    )
  );
}
