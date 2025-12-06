import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Card from "../../components/Cards/Cards";
import { useTranslation } from "react-i18next";

import "./DayTrip.css";
import { NavLink } from "react-router-dom";
import QuiltedImageList from "../../components/QuiltedImageList/QuiltedImageList";
import Footer from "../../components/Footer/Footer";

const DayTrip = () => {
  const { t } = useTranslation("home");
  return (
    <Box className="content-day-trip" component="section">
      <Box className="container-day-trip">
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
              tu día perfecto
            </Typography>
            <Typography component="h1" className="title-day-trip">
              frente al mar
            </Typography>
          </Box>
          <Typography component="p" className="descriotion-day-trip">
            Disfruta un pasadía completo en Mangata: playa, gastronomía,
            cocteles y actividades en las Islas del Rosario.
          </Typography>

          <Button
            className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95"
            to="/MangataReservation"
            component={NavLink}
          >
            Reservar
          </Button>
        </Box>
      </Box>

      <Box
        className="background-ligth-blue p-relative margin-top-8 margin-bottom-8"
        sx={{
          height: { xs: "auto", xl: "400px" },
          paddingBlock: { xs: 2, xl: 0 },
        }}
      >
        <Box
          sx={{
            position: { xs: "inherit", xl: "absolute" },
            top: { xs: 0, lg: "-200px" },
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            sx={{
              color: { xs: "#FFFFFF", md: "var(--color-theme-dark-blue)" },
              fontSize: 22,
              fontWeight: 600,
              marginBlock: 4,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {t("servicesIncluded")}
          </Typography>
          <Box className="d-flex align-items-center justify-content-center flex-wrap flex-row gap-50">
            <Card title={t("roundTrip")} img="/images/MangataBoat.webp" />
            <Card title={t("welcomeGlass")} img="/images/MangataCopa.webp" />
            <Card title={t("airConditioned")} img="/images/MangataEat.webp" />
            <Card title={t("waterSports")} img="/images/MangataKayak.webp" />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: { xs: "96%", md: "65%" },
          margin: "0 auto",
          marginBlock: 12,
        }}
      >
        <Typography
          className="color-blue-dark"
          sx={{
            fontSize: 22,
            fontWeight: 600,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("lunchCarte")}
        </Typography>
        <Typography
          className="color-blue-dark"
          sx={{
            fontSize: 18,
            fontWeight: 400,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("enjoyYourLunch")} <b>{t("with8")}:</b>
        </Typography>
        <QuiltedImageList />
      </Box>
      <Box className="noInclude">
        <Typography>{t("noInclude")}</Typography>
        <Typography>{t("additionalActivities")}</Typography>
      </Box>
      <Footer />
    </Box>
  );
};

export default DayTrip;
