import { BASE_COLORS } from "@/configs";
import { NavLink, createStyles } from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles(() => ({
  activeNavLink: {
    borderRadius: 10,
    color: "white",
    backgroundColor: BASE_COLORS.orange,
    outlineColor: BASE_COLORS.orange,
    ":hover": {
      color: "white",
      backgroundColor: BASE_COLORS.orange,
    },
  },
  navLink: {
    borderRadius: 10,
    color: BASE_COLORS.gray_text,
    backgroundColor: "white",
    outlineColor: "white",
    ":hover": {
      color: "white",
      backgroundColor: BASE_COLORS.orange,
    },
  },
}));

export default function NavItem({ icon, link, label, children }) {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <NavLink
      icon={icon}
      label={label}
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
      className={
        router.pathname.includes(link) ? classes.activeNavLink : classes.navLink
      }
    >
      {children}
    </NavLink>
  );
}
