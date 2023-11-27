import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

const PAGE_SIZES = [5, 10, 15];

export default function BaseTable({
  rows,
  columns,
  noPagination,
  noHeader,
  withColumnBorders,
}) {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(rows);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(rows.slice(from, to));
  }, [page, pageSize, rows]);

  if (noPagination) {
    return (
      <DataTable
        withColumnBorders={withColumnBorders}
        noHeader={noHeader}
        withBorder
        minHeight={200}
        records={records}
        columns={columns}
        borderRadius="md"
      />
    );
  }

  return (
    <DataTable
      withColumnBorders={withColumnBorders}
      noHeader={noHeader}
      borderRadius="md"
      withBorder
      minHeight={200}
      records={records}
      columns={columns}
      totalRecords={rows.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
    />
  );
}
