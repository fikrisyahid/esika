import {
  IconLayoutDashboard,
  IconListNumbers,
  IconMessages,
  IconMilitaryAward,
  IconNotebook,
} from "@tabler/icons-react";

const studentNavLists = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/student/dashboard",
  },
  {
    icon: <IconNotebook />,
    label: "Course",
    link: "/student/course",
  },
  {
    icon: <IconListNumbers />,
    label: "Quiz",
    link: "/student/quiz",
  },
  {
    icon: <IconMilitaryAward />,
    label: "Leaderboard",
    link: "/student/leaderboard",
  },
  {
    icon: <IconMessages />,
    label: "Forum",
    link: "/student/forum",
  },
];

export default studentNavLists;
