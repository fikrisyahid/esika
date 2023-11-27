import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function MainCard({
  children,
  row,
  center,
  transparent,
  noPadding,
  gap,
  noGap,
  fullWidth,
  width,
  style,
  thinShadow,
  forceRow,
  noShadow,
  wrap,
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const theme = useMantineTheme();
  return (
    <div
      style={{
        gap: noGap
          ? 0
          : gap || (isMobile ? theme.spacing.xs : theme.spacing.sm),
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        borderRadius: theme.radius.md,
        boxSizing: "border-box",
        padding: noPadding ? 0 : isMobile ? 10 : 20,
        width: fullWidth || isMobile ? "100%" : width,
        alignItems: !row && center ? "center" : "normal",
        flexDirection: (row && !isMobile) || forceRow ? "row" : "column",
        justifyContent: (row || forceRow) && center ? "center" : "normal",
        backgroundColor: transparent ? "transparent" : "white",
        boxShadow:
          transparent || noShadow
            ? "none"
            : thinShadow
            ? "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
            : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
