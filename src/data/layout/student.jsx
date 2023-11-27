import {
  IconLayoutDashboard,
  IconListNumbers,
  IconMilitaryAward,
  IconNotebook,
  IconNotes,
} from "@tabler/icons-react";

const studentNavLists = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/student/dashboard",
  },
  {
    icon: <IconNotebook />,
    label: "Kelas",
    link: "/student/kelas",
  },
  {
    icon: <IconListNumbers />,
    label: "Quiz",
    link: "/student/quiz",
  },
  {
    icon: <IconMilitaryAward />,
    label: "Challenge",
    link: "/student/challenge",
  },
  {
    icon: <IconNotes />,
    label: "Ujian",
    link: "/student/ujian",
  },
];

export default studentNavLists;
