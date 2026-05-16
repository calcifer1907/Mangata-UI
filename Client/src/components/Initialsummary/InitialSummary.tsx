import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import ImageCarousel from "../Slider/Slider";

import "./styleInitialsummary.css";

const sampleImages = [
  {
    id: "1",
    src: "images/Lancha.webp",
    alt: "Lancha en el mar Caribe",
    title: "",
    description: "",
  },
  {
    id: "2",
    src: "images/MangataEat.webp",
    alt: "Gastronomía en Mangata",
    title: "",
    description: "",
  },
  {
    id: "3",
    src: "images/IMG_6285.webp",
    alt: "Experiencia en la playa",
    title: "",
    description: "",
  },
  {
    id: "4",
    src: "images/MangataChampagne.webp",
    alt: "Celebración en Mangata",
    title: "",
    description: "",
  },
];

const HERO_BADGES = [
  { key: "homeHeroBadge1", Icon: PlaceOutlinedIcon },
  { key: "homeHeroBadge2", Icon: WavesOutlinedIcon },
] as const;

const InitialSummary = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("sm"));
  const carouselHeight = isCompact ? 400 : 540;

  return (
    <Box
      component="section"
      className="initial-summary-section"
      aria-labelledby="hero-heading"
    >
      <Box className="initial-summary-bg" aria-hidden />

      <Box className="initial-summary-inner">
        <Box className="initial-summary-panel">
          <Box className="initial-summary-visual">
            <Box className="initial-summary-frame " aria-hidden />
            <Box className="initial-summary-frame initial-summary-frame--front">
              <Box className="initial-summary-carousel">
                <ImageCarousel
                  images={sampleImages}
                  height={carouselHeight}
                  variant="full"
                  showIndicators
                  indicatorVariant="light"
                  transition="fade"
                  showControls
                  showCounter
                />
              </Box>
            </Box>
          </Box>

          <Box className="initial-summary-content">
            <Typography className="initial-summary-overline">
              {t("homeHeroOverline")}
            </Typography>
            <Typography
              component="h1"
              id="hero-heading"
              className="initial-summary-title"
            >
              {t("titleHomeSlider")}
            </Typography>
            <Box className="initial-summary-title-accent" aria-hidden />
            <Typography className="initial-summary-text">
              {t("descriptionHomeSlider")}
            </Typography>

            <Box className="initial-summary-badges">
              {HERO_BADGES.map(({ key, Icon }) => (
                <Box key={key} className="initial-summary-badge">
                  <Icon className="initial-summary-badge-icon" />
                  <span>{t(key)}</span>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              component={NavLink}
              to="/DayTrip"
              className="initial-summary-cta"
            >
              {t("homeHeroCta")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InitialSummary;
