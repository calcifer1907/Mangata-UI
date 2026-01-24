import { Box, Typography } from "@mui/material";

import "./styleLodging.css";

import RoomCard from "./RoomCard";
import { useTranslation } from "react-i18next";

const roomData = {
  title: "VILLA SUPERIOR 2",
  roomCount: 2,
  maxCapacity: 4,
  size: "90 M²",
  description:
    "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
  price: "$ 1.800.000",
  images: [
    {
      id: 1,
      url: "/images/Lodging/IMG_4318.webp",
      alt: "Vista principal de la villa",
    },
    {
      id: 2,
      url: "/images/Lodging/IMG_4318.webp",
      alt: "Habitación principal",
    },
    {
      id: 3,
      url: "/images/Lodging/IMG_4318.webp",
      alt: "Baño de lujo",
    },
    {
      id: 4,
      url: "/images/Lodging/IMG_4318.webp",
      alt: "Vista al jardín",
    },
  ],
};

const Lodging = () => {
  const { t } = useTranslation("reserve");
  return (
    <Box>
      <Box className="container-menu">
        <Box
          sx={{
            maxWidth: { xs: "90%", md: "80%", lg: "50%" },
            padding: { xs: "2rem", md: "6rem" },
          }}
        >
          <Box>
            <Typography
              component="h1"
              className="title-day-trip"
              sx={{
                fontSize: { xs: "2rem", md: "3.2rem" },
              }}
            >
              {t("titleLodging1")}
            </Typography>
            <Typography
              component="h1"
              className="title-day-trip"
              sx={{
                fontSize: { xs: "2rem", md: "3.2rem" },
              }}
            >
              {t("titleLodging2")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <div style={{ padding: "20px" }}>
        <RoomCard {...roomData} />
      </div>
    </Box>
  );
};

export default Lodging;
