import { Box } from "@mui/material";

import "./styleInitialSummary.css";

import ImageCarousel from "../Slider/Slider";
import { useTranslation } from "react-i18next";

const sampleImages = [
  {
    id: "1",
    src: "images/Lancha.webp",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "2",
    src: "images/MangataEat.webp",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "3",
    src: "images/eventMirred.webp",
    alt: "",
    title: "",
    description: "",
  },

  {
    id: "4",
    src: "images/MangataChampagne.webp",
    alt: "",
    title: "",
    description: "",
  },
];
const InitialSummary = () => {
  const { t } = useTranslation("home");
  return (
    <Box
      className="initial-summary-container"
      sx={{
        marginBottom: { xs: 0, md: "250px", lg: "250px" },
        paddingBottom: { xs: "30px" },
      }}
    >
      <Box className="initial-summary-image">
        <ImageCarousel
          images={sampleImages}
          height={window.innerWidth < 600 ? 500 : 650}
          variant="full"
          showIndicators={true}
          transition="slide"
          showControls={false}
        />
      </Box>
      <Box>
        <h2 className="initial-summary-title">{t("titleHomeSlider")}</h2>
        <p className="initial-summary-text">{t("descriptionHomeSlider")}</p>
      </Box>
    </Box>
  );
};

export default InitialSummary;
