import { Box } from "@mui/material";

import "./styleInitialSummary.css";

import ImageCarousel from "../Slider/Slider";
import { useTranslation } from "react-i18next";

const sampleImages = [
  {
    id: "1",
    src: "images/MangataEat.webp",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
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
          height={400}
          variant="compact"
          showIndicators={true}
          transition="slide"
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
