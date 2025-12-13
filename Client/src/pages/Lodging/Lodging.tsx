import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import "./styleLodging.css";

const Lodging = () => {
  return (
    <Box>
      <Box className="container-loading">
        <Box
          sx={{
            maxWidth: { xs: "90%", md: "80%", lg: "50%" },
            margin: "5rem",
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
              Despierta con el sonido del mar
            </Typography>
            <Typography component="h1" className="title-day-trip">
              sonido del mar
            </Typography>
          </Box>
          <Typography component="p" className="descriotion-day-trip">
            Hotel boutique frente al mar en Isla Grande. Habitaciones cálidas,
            vistas espectaculares y experiencias para desconectarte de verdad.
          </Typography>

          <Button
            className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95"
            to="/LodgingReservation"
            component={NavLink}
          >
            Reservar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Lodging;
