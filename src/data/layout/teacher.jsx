import {
  IconLayoutDashboard,
  IconListNumbers,
  IconMessages,
  IconMilitaryAward,
  IconNotebook,
  IconUser,
} from "@tabler/icons-react";

const teacherNavLists = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/teacher/dashboard",
  },
  {
    icon: <IconNotebook />,
    label: "Course",
    link: "/teacher/course",
  },
  {
    icon: <IconListNumbers />,
    label: "Quiz",
    link: "/teacher/quiz",
  },
  {
    icon: <IconMilitaryAward />,
    label: "Leaderboard",
    link: "/teacher/leaderboard",
  },
  {
    icon: <IconMessages />,
    label: "Forum",
    link: "/teacher/forum",
  },
  {
    icon: <IconUser />,
    label: "Student",
    link: "/teacher/student",
  },
];

export default teacherNavLists;
