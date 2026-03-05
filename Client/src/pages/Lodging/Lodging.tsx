import { Box } from "@mui/material";
import Banner from "../../components/Banner/Banner";

import "./styleLodging.css";

import RoomCard from "./RoomCard";

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
  return (
    <Box>
      <Banner
        title="titleLodging1"
        titleTwo="titleLodging2"
        description=""
        linkButton="LodgingReserve"
      />

      <div style={{ padding: "20px" }}>
        <RoomCard {...roomData} />
      </div>
    </Box>
  );
};

export default Lodging;
