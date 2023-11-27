import {
  IconLayoutDashboard,
  IconListNumbers,
  IconMessages,
  IconMilitaryAward,
  IconNotebook,
  IconUser,
} from "@tabler/icons-react";

const adminNavLists = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: <IconNotebook />,
    label: "Course",
    link: "/admin/course",
  },
  {
    icon: <IconListNumbers />,
    label: "Quiz",
    link: "/admin/quiz",
  },
  {
    icon: <IconMilitaryAward />,
    label: "Leaderboard",
    link: "/admin/leaderboard",
  },
  {
    icon: <IconMessages />,
    label: "Forum",
    link: "/admin/forum",
  },
  {
    icon: <IconUser />,
    label: "Student",
    link: "/admin/student",
  },
];

export default adminNavLists;
