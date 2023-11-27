import {
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";

const adminNavLists = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: <IconUser />,
    label: "Users",
    link: "/admin/users",
  },
];

export default adminNavLists;
