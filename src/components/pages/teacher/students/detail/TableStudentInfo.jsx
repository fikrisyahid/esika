/* eslint-disable no-unsafe-optional-chaining */
import MyTable from "@/components/BaseTable";

export default function TableStudentInfo({ student }) {
  const columns = [
    { accessor: "info", title: "Info" },
    { accessor: "value", title: "Value", textAlignment: "center" },
  ];

  const rows = [
    { info: "Point", value: student?.data?.point },
    { info: "Course Taken", value: student?.data?.course_taken },
    { info: "Quiz Passed", value: student?.data?.quiz_passed },
    { info: "Quiz Failed", value: student?.data?.quiz_failed },
    {
      info: "Quiz Done Total",
      value: student?.data?.quiz_passed + student?.data?.quiz_failed,
    },
    { info: "Comments", value: student?.data?.comment_count },
    { info: "Like", value: student?.data?.like_count },
  ];

  return (
    <MyTable
      rows={rows}
      columns={columns}
      noPagination
      noHeader
      withColumnBorders
    />
  );
}
