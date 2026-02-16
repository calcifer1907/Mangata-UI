import { alpha } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export const createEventsStyles = (theme: Theme) => {
  const page: SxProps<Theme> = {
    background: `linear-gradient(180deg, ${
      theme.palette.background.default
    } 0%, ${alpha(theme.palette.primary.main, 0.04)} 40%, ${
      theme.palette.background.default
    } 100%)`,
  };

  const fullWidthSection: SxProps<Theme> = {
    width: "100vw",
    ml: "calc(50% - 50vw)",
    mr: "calc(50% - 50vw)",
    overflowX: "clip",
  };

  const splitContainer: SxProps<Theme> = {
    minHeight: { xs: "auto", md: 520 },
    borderTop: `1px solid ${alpha(theme.palette.grey[200], 0.9)}`,
    borderBottom: `1px solid ${alpha(theme.palette.grey[200], 0.9)}`,
    boxShadow: "none",
    backgroundColor: theme.palette.background.paper,
  };

  const splitImagePanel = (imageUrl: string): SxProps<Theme> => ({
    height: { xs: 320, md: "100%" },
    minHeight: { md: 520 },
    backgroundImage: `linear-gradient(180deg, ${alpha(
      "#000",
      0.08,
    )} 0%, ${alpha("#000", 0.18)} 100%), url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxShadow: "none",
  });

  const splitTextPanel = (opts: {
    from: string;
    to: string;
    radialGradient: string;
  }): SxProps<Theme> => ({
    height: "100%",
    py: { xs: 6, md: 8 },
    px: { xs: 3, sm: 6, md: 8 },
    color: "#fff",
    background: `linear-gradient(180deg, ${alpha(opts.from, 0.92)} 0%, ${alpha(
      opts.to,
      0.86,
    )} 100%)`,
    position: "relative",
    overflow: "hidden",
    boxShadow: "none",
    "&:before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: opts.radialGradient,
      pointerEvents: "none",
    },
  });

  return {
    page,
    container: { py: { xs: 4, md: 6 } } satisfies SxProps<Theme>,

    section: { mb: { xs: 8, md: 10 } } satisfies SxProps<Theme>,
    sectionTitleRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      mb: { xs: 2.5, md: 3 },
    } satisfies SxProps<Theme>,
    sectionTitle: {
      fontWeight: 700,
      color: "var(--color-theme-dark-blue)",
    } satisfies SxProps<Theme>,
    sectionSubtitle: {
      mb: { xs: 4, md: 5 },
      color: theme.palette.text.secondary,
      maxWidth: 720,
      mx: "auto",
      lineHeight: 1.65,
    } satisfies SxProps<Theme>,

    cardsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: { xs: 2, md: 3 },
      justifyContent: "center",
      mb: { xs: 3, md: 4 },
    } satisfies SxProps<Theme>,

    eventCard: (eventColor: string): SxProps<Theme> => ({
      flex: "1 1 300px",
      maxWidth: "350px",
      minWidth: "280px",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      borderRadius: 3,
      overflow: "hidden",
      border: `1px solid ${alpha(theme.palette.grey[200], 0.9)}`,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        borderColor: alpha(eventColor, 0.38),
        "& .event-icon": {
          transform: "scale(1.1) rotate(5deg)",
        },
        "& .event-image": {
          transform: "scale(1.06)",
        },
      },
      "&:focus-within": {
        outline: `2px solid ${alpha(eventColor, 0.35)}`,
        outlineOffset: 2,
      },
    }),

    eventImageWrap: {
      position: "relative",
      height: { xs: 220, sm: 240 },
    } satisfies SxProps<Theme>,
    eventImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s ease",
    } satisfies SxProps<Theme>,
    eventImageOverlay: {
      position: "absolute",
      inset: 0,
      background: `linear-gradient(180deg, ${alpha("#000", 0.03)} 0%, ${alpha(
        "#000",
        0.62,
      )} 100%)`,
    } satisfies SxProps<Theme>,
    featuredChip: {
      position: "absolute",
      top: 12,
      right: 12,
      fontSize: "0.7rem",
      height: 22,
      bgcolor: alpha("#ffffff", 0.22),
      color: "#fff",
      border: `1px solid ${alpha("#ffffff", 0.3)}`,
      backdropFilter: "blur(6px)",
    } satisfies SxProps<Theme>,

    eventTitleRow: {
      position: "absolute",
      left: theme.spacing(2.5),
      right: theme.spacing(2.5),
      bottom: theme.spacing(1.75),
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    } satisfies SxProps<Theme>,
    eventIcon: {
      width: 44,
      height: 44,
      backgroundColor: alpha("#ffffff", 0.22),
      border: `1px solid ${alpha("#ffffff", 0.35)}`,
      transition: "transform 0.3s ease",
      flexShrink: 0,
    } satisfies SxProps<Theme>,
    eventTitle: {
      fontWeight: 800,
      fontSize: "1.1rem",
      lineHeight: 1.2,
      color: "#fff",
      textShadow: "0 2px 10px rgba(0,0,0,0.35)",
    } satisfies SxProps<Theme>,
    eventContent: {
      p: { xs: 2.25, md: 2.75 },
      background: `linear-gradient(180deg, ${
        theme.palette.background.paper
      } 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
    } satisfies SxProps<Theme>,
    eventDescription: {
      lineHeight: 1.6,
      fontSize: "0.9rem",
      mb: 0,
      color: alpha(theme.palette.text.primary, 0.78),
    } satisfies SxProps<Theme>,

    fullWidthSection,
    splitContainer,
    splitImagePanel,
    splitContentWrap: {
      position: "relative",
      maxWidth: 680,
      mx: { xs: "auto", md: 0 },
    } satisfies SxProps<Theme>,
    overline: {
      letterSpacing: "0.18em",
      opacity: 0.85,
      display: "inline-block",
      mb: 1,
    } satisfies SxProps<Theme>,
    splitTitle: {
      fontWeight: 800,
      lineHeight: 1.1,
      mb: 2,
      fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.6rem" },
    } satisfies SxProps<Theme>,
    splitSubtitle: {
      opacity: 0.88,
      maxWidth: 560,
      mb: 4,
      lineHeight: 1.6,
    } satisfies SxProps<Theme>,
    splitListRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
      py: 1.5,
      borderBottom: `1px solid ${alpha("#fff", 0.12)}`,
      boxShadow: "none",
    } satisfies SxProps<Theme>,
    splitListIconCircle: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      border: `1px solid ${alpha("#fff", 0.35)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      mt: "2px",
      backgroundColor: alpha("#fff", 0.06),
      boxShadow: "none",
    } satisfies SxProps<Theme>,
    splitListText: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: { xs: "0.95rem", md: "1rem" },
      opacity: 0.95,
    } satisfies SxProps<Theme>,

    allInclusiveTextPanel: splitTextPanel({
      from: theme.palette.grey[900],
      to: theme.palette.grey[900],
      radialGradient:
        "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 55%)",
    }),
    customizeTextPanel: splitTextPanel({
      from: theme.palette.primary.dark,
      to: theme.palette.primary.dark,
      radialGradient:
        "radial-gradient(circle at 82% 18%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 58%)",
    }),

    ctaPaper: {
      p: { xs: 4, md: 6 },
      textAlign: "center",
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      color: "white",
      borderRadius: 3,
      position: "relative",
      overflow: "hidden",
    } satisfies SxProps<Theme>,
    ctaOverlay: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background:
        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    } satisfies SxProps<Theme>,
    ctaTitle: {
      fontWeight: 800,
      position: "relative",
      mb: 2,
    } satisfies SxProps<Theme>,
    ctaSubtitle: {
      mb: 4,
      position: "relative",
      opacity: 0.9,
      fontWeight: 400,
    } satisfies SxProps<Theme>,
    ctaButton: {
      bgcolor: "white",
      color: theme.palette.primary.dark,
      fontWeight: 700,
      px: 5,
      py: 1.5,
      borderRadius: "0.5rem",
      "&:hover": {
        bgcolor: "grey.50",
        transform: "scale(1.05)",
      },
      position: "relative",
      transition: "all 0.3s",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    } satisfies SxProps<Theme>,
  };
};
