import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fade, Fab, Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

type ScrollToTopButtonProps = {
  /**
   * Show button only after this many pixels of scroll.
   */
  showAfterPx?: number;
  /**
   * Tooltip/aria label.
   */
  label?: string;
  /**
   * Extra bottom offset so it doesn't overlap other floating buttons.
   */
  bottomOffsetPx?: number;
};

export default function ScrollToTopButton({
  showAfterPx = 300,
  label = "Subir",
  bottomOffsetPx = 88,
}: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  const threshold = useMemo(() => Math.max(0, showAfterPx), [showAfterPx]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY ?? 0;
      setVisible(y > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={visible}>
      <Tooltip title={label} placement="left">
        <Fab
          size="small"
          onClick={handleClick}
          aria-label={label}
          sx={(theme) => ({
            position: "fixed",
            right: { xs: 16, sm: 24 },
            bottom: { xs: bottomOffsetPx, sm: bottomOffsetPx + 8 },
            zIndex: theme.zIndex.snackbar - 1,
            backgroundColor: "rgba(43, 61, 94, 0.9)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(43, 61, 94, 1)",
            },
          })}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Fade>
  );
}
