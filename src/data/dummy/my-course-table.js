const rows = Array.from({ length: 50 }, (_, i) => ({
  id: `d0d0f9b1-7bb9-4b1e-967d-3ea81de7dd${i + 60}`,
  firstName: `First Name ${i + 1}`,
  lastName: `Last Name ${i + 1}`,
  email: `email${i + 1}@example.com`,
}));

const columns = [
  { accessor: "firstName" },
  { accessor: "lastName" },
  { accessor: "email" },
];

const myCourseTableData = {
  rows,
  columns,
};

export default myCourseTableData;
