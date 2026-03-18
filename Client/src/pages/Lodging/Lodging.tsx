import { Box } from "@mui/material";
import Banner from "../../components/Banner/Banner";

import "./styleLodging.css";

import RoomCard from "./RoomCard";
import { rooms } from "./rooms";
import Footer from "../../components/Footer/Footer";

const Lodging = () => {
  return (
    <Box>
      <Banner
        title="titleLodging1"
        titleTwo="titleLodging2"
        description=""
        linkButton="LodgingReserve"
      />

      <Box
        className="d-flex flex-wrap gap-24 arena-granulada"
        style={{ padding: "50px" }}
      >
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default Lodging;
