import {
  IconLayoutDashboard,
  IconListNumbers,
  IconMilitaryAward,
  IconNotebook,
  IconNotes,
} from "@tabler/icons-react";

const teacherNavLists = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/teacher/dashboard",
  },
  {
    icon: <IconNotebook />,
    label: "Kelas",
    link: "/teacher/kelas",
  },
  {
    icon: <IconListNumbers />,
    label: "Quiz",
    link: "/teacher/quiz",
  },
  {
    icon: <IconMilitaryAward />,
    label: "Challenge",
    link: "/teacher/challenge",
  },
  {
    icon: <IconNotes />,
    label: "Ujian",
    link: "/teacher/ujian",
  },
];

export default teacherNavLists;
