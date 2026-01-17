import { Box, Typography, Button } from "@mui/material";

import "../Menu/styleMenu.css";
import Footer from "../../components/Footer/Footer";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const Boat = () => {
  const { t } = useTranslation("home");
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
              {t("titleDayTripDescription2")}
            </Typography>
            <Typography
              component="h1"
              className="title-day-trip"
              sx={{
                fontSize: { xs: "2rem", md: "3.2rem" },
              }}
            >
              {t("titleDayTripDescription3")}
            </Typography>
          </Box>
          <Typography component="p" className="descriotion-day-trip">
            {t("descriptionBoat")}
          </Typography>

          <Button
            className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => {}}
            to="/BoatRental"
            component={NavLink}
          >
            {t("Reserve")}
          </Button>
        </Box>
      </Box>

      <Box className="container-menu-plates" component="section">
        <Box>
          <Typography
            component="h1"
            className="title-menu-some-plates"
            sx={{
              fontSize: { xs: "2rem", md: "3.2rem" },
            }}
          >
            Nuestros Botes
          </Typography>
          <Box
            className="d-flex align-items-center justify-content-around flex-wrap gap-8"
            sx={{ flexDirection: { xs: "column-reverse", lg: "row" } }}
          >
            <Box
              component="img"
              src="/images/lunche/FOTOS PLATOS/caribeña_adicional.webp"
              alt="Platos de Mangata"
              sx={{
                width: { xs: "85%", lg: 600 },
                height: { xs: 500, lg: 800 },
              }}
              loading="lazy"
            />
            <Box
              className="d-flex align-items-center justify-content-center flex-direction-column text-align-center content-descrition-plates"
              sx={{ gap: { xs: 1, lg: 5 } }}
            >
              <Typography component="h1">miscela caraibica</Typography>
              <Typography
                component="p"
                sx={{
                  maxWidth: { xs: "90%", md: "80%", lg: "60%" },
                }}
              >
                exquisita combinación de fritos tradicionales de la región
                caribe. Arepa de huevo, carimañolas, deditos de queso frito,
                empanadas y patacones araña.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="d-flex align-items-center justify-content-around flex-wrap gap-8">
            <Box
              className="d-flex align-items-center justify-content-center flex-direction-column  text-align-center content-descrition-plates"
              sx={{ gap: { xs: 1, lg: 5 } }}
            >
              <Typography component="h1">fra amici</Typography>
              <Typography
                component="p"
                sx={{
                  maxWidth: { xs: "90%", md: "80%", lg: "60%" },
                }}
              >
                tradicional ceviche peruano de corvina, pulpo y camarones,
                acompañado con chips de platano.
              </Typography>
            </Box>
            <Box
              component="img"
              src="/images/lunche/FOTOS PLATOS/fra_amici_adicional.webp"
              alt="Platos de Mangata"
              sx={{
                width: { xs: "85%", lg: 600 },
                height: { xs: 400, lg: 700 },
              }}
              loading="lazy"
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Boat;
