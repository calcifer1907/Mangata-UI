import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

import Card from "../../components/Cards/Cards";
import { useTranslation } from "react-i18next";

import "./DayTrip.css";
import "../Home/styleHome.css";
import QuiltedImageList from "../../components/QuiltedImageList/QuiltedImageList";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";

import { images } from "../../constant/ImagesGrid";
import { formatPrice } from "../../generalFunctions/formaters";
import { getMinMax } from "../../utils/api/agent";

import Towel from "../../assets/Icons/Towel.svg";
import hammocks from "../../assets/Icons/Hammocks.svg";
import Champagne from "../../assets/Icons/Champagne.svg";
import SpeedBoat from "../../assets/Icons/SpeedBoat.svg";
import Wifi from "../../assets/Icons/Wifi.svg";

const DayTrip = () => {
  const { t } = useTranslation("home");
  const [price, setPrice] = useState<number | null>(null);
  const [priceStatus, setPriceStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let active = true;

    getMinMax
      .getListData("DAY_TRIP")
      .then(([response]) => {
        if (!active) return;
        const amount = Number(response?.max);
        if (!Number.isFinite(amount) || amount <= 0) {
          setPriceStatus("error");
          return;
        }
        setPrice(amount);
        setPriceStatus("ready");
      })
      .catch(() => {
        if (active) setPriceStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Box className="content-day-trip" component="section">
      <Banner
        title="titleDayTrip1"
        titleTwo="titleDayTrip2"
        description="titleDayTripDescription"
        linkButton="MangataReservation"
      />
      <Box className="daytrip-intro">
        {priceStatus !== "error" && (
          <Box className="daytrip-price">
            <Typography className="daytrip-price-note">
              {t("dayTripPriceNote")}
            </Typography>
            {priceStatus === "ready" && price !== null ? (
              <Typography component="p" className="daytrip-price-amount">
                {formatPrice(price)}
              </Typography>
            ) : (
              <Skeleton
                className="daytrip-price-skeleton"
                variant="rounded"
                animation="wave"
                aria-label={t("dayTripPriceLoading")}
                sx={{
                  width: "min(240px, 70%)",
                  height: "clamp(2.6rem, 6vw, 3.75rem)",
                  mx: "auto",
                  mt: 0.25,
                  borderRadius: "12px",
                  bgcolor: "rgba(15, 42, 74, 0.1)",
                }}
              />
            )}
            <Typography className="daytrip-price-kicker">
              {t("dayTripPriceKicker")}
            </Typography>
            <Box className="daytrip-price-rule" />
          </Box>
        )}
      <Box
        className="d-flex align-items-center justify-content-center flex-wrap flex-row"
        sx={{
          gap: { xs: 1.5, sm: 2, lg: 3 },
          paddingBlock: { xs: 1, lg: 2 },
          marginBottom: { xs: 0, lg: 25 },
        }}
      >
        <Box
          component="img"
          src={SpeedBoat}
          alt="Speed Boat"
          width={{ xs: 48, sm: 64, lg: 112 }}
        />
        <Box
          component="img"
          src={Champagne}
          alt="Champagne"
          width={{ xs: 48, sm: 64, lg: 112 }}
        />
        <Box
          component="img"
          src={Towel}
          alt="Towel"
          width={{ xs: 48, sm: 64, lg: 112 }}
        />
        <Box
          component="img"
          src={hammocks}
          alt="Hammocks"
          width={{ xs: 48, sm: 64, lg: 112 }}
        />
        <Box
          component="img"
          src={Wifi}
          alt="Wifi"
          width={{ xs: 48, sm: 64, lg: 112 }}
        />
      </Box>
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
              <Card
                title={t("roundTrip")}
                img="/images/DayTrip/MangataBoat.webp"
              />
              <Card
                title={t("welcomeGlass")}
                img="/images/DayTrip/MangataCopa.webp"
              />
              <Card
                title={t("airConditioned")}
                img="/images/DayTrip/IMG_5813.webp"
              />
              <Card
                title={t("waterSports")}
                img="/images/DayTrip/IMG_5005.webp"
              />
              <Card title={t("bicycle")} img="/images/DayTrip/IMG_5004.webp" />
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
        <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
          <QuiltedImageList images={images} />
        </Box>
      </Box>
      <Box className="daytrip-fee">
        <Container maxWidth="md">
          <Paper elevation={0} className="home-schedule-card home-schedule-fee">
            <PaymentsOutlinedIcon className="home-schedule-icon" />
            <Typography className="home-schedule-kicker">
              {t("islandInsuranceKicker")}
            </Typography>
            <Typography className="home-schedule-label">
              {t("islandInsuranceLabel")}
            </Typography>
            <Typography className="home-schedule-time">
              {t("islandInsuranceAmount")}
            </Typography>
            <Typography className="home-schedule-cash">
              {t("islandInsuranceCash")}
            </Typography>
          </Paper>
        </Container>
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
