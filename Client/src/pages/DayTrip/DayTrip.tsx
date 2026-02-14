import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Card from "../../components/Cards/Cards";
import { useTranslation } from "react-i18next";

import "./DayTrip.css";
import QuiltedImageList from "../../components/QuiltedImageList/QuiltedImageList";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";

import Towel from "../../assets/icons/Towel.svg";
import hammocks from "../../assets/icons/hammocks.svg";
import Champagne from "../../assets/icons/Champagne.svg";
import SpeedBoat from "../../assets/icons/SpeedBoat.svg";
import Wifi from "../../assets/icons/Wifi.svg";

const DayTrip = () => {
  const { t } = useTranslation("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className="content-day-trip" component="section">
      <Banner
        title="titleDayTrip1"
        titleTwo="titleDayTrip2"
        description="titleDayTripDescription"
        linkButton="MangataReservation"
      />
      <Box
        className="d-flex align-items-center justify-content-center flex-wrap flex-row gap-16"
        sx={{ paddingBlock: { xs: 2, lg: 0 }, marginBottom: { xs: 0, lg: 25 } }}
      >
        <Box
          component="img"
          src={SpeedBoat}
          alt="Mangata Beach"
          width={{ xs: 64, lg: 128 }}
        />
        <Box
          component="img"
          src={Champagne}
          alt="Mangata Beach"
          width={{ xs: 64, lg: 128 }}
        />
        <Box
          component="img"
          src={Towel}
          alt="Mangata Beach"
          width={{ xs: 64, lg: 128 }}
        />
        <Box
          component="img"
          src={hammocks}
          alt="Mangata Beach"
          width={{ xs: 64, lg: 128 }}
        />
        <Box
          component="img"
          src={Wifi}
          alt="Mangata Beach"
          width={{ xs: 64, lg: 128 }}
        />
      </Box>
      <Box className="p-relative">
        <Box
          className="background-ligth-blue  margin-top-8 margin-buttom"
          sx={{
            height: { xs: "auto", xl: "400px" },
            paddingBlock: { xs: 2, xl: 0 },
            top: { xs: 0, lg: "200px" },
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
              className="title-home"
              sx={{
                color: { xs: "#FFFFFF", md: "var(--color-theme-dark-blue)" },
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
      </Box>

      <Box
        sx={{
          maxWidth: { xs: "96%", md: "65%" },
          margin: "0 auto",
          // marginBlock: 12,
        }}
      >
        <Typography className="color-blue-dark title-home">
          {t("lunchCarte")}
        </Typography>
        <Typography
          className="color-blue-dark "
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
