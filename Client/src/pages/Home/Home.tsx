import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useTranslation } from "react-i18next";

import Card from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import InitialSummary from "../../components/Initialsummary/InitialSummary";
import YouTubeEmbed from "../../components/YouTubeEmbed/YouTubeEmbed";
import HomeFacilities from "./HomeFacilities";

import "./styleHome.css";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1700.452588924178!2d-75.74653340145481!3d10.18260159812736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e587d182be4842b%3A0x6b4b5e8abb065bdb!2sMangata!5e0!3m2!1ses!2sco!4v1744051915629!5m2!1ses!2sco";

const serviceCards = [
  {
    titleKey: "TitleCardDayTrip",
    img: "/images/MangataBeach.webp",
    redirectTo: "/DayTrip",
  },
  {
    titleKey: "titleCardLoding",
    img: "/images/Hotel.webp",
    redirectTo: "https://engine.ayenda.co/mangata-beach-9a99c4fa-disabled-sale",
  },
  {
    titleKey: "titleCardBoat",
    img: "/images/DayTrip/MangataBoat.webp",
    redirectTo: "/Boat",
  },
  {
    titleKey: "titleCardEvents",
    img: "/images/Events.webp",
    redirectTo: "/events",
  },
] as const;

const Home = () => {
  const { t } = useTranslation("home");

  return (
    <Box component="main">
      <Box
        className="video-background-container"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <YouTubeEmbed />
      </Box>

      <InitialSummary />

      <Box className="home-services-section background-ligth-blue">
        <Container maxWidth="xl" className="home-services-container">
          <Typography
            component="h2"
            className="title-home home-section-title"
            sx={{
              color: { xs: "#FFFFFF", md: "var(--color-theme-dark-blue)" },
            }}
          >
            {t("ourIncluded")}
          </Typography>
          <Typography
            className="home-section-subtitle"
            sx={{
              color: {
                xs: "rgba(255,255,255,0.9)",
                md: "var(--color-theme-dark-blue)",
              },
            }}
          >
            {t("homeServicesSubtitle")}
          </Typography>
          <Box className="home-cards-grid">
            {serviceCards.map(({ titleKey, img, redirectTo }) => (
              <Card
                key={redirectTo}
                title={t(titleKey)}
                img={img}
                button
                redirectTo={redirectTo}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <HomeFacilities />
      <Box className="home-schedule">
        <Container maxWidth="md">
          <Typography component="h2" className="home-schedule-heading">
            {t("homeScheduleTitle")}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} className="home-schedule-card">
                <AccessTimeOutlinedIcon className="home-schedule-icon" />
                <Typography className="home-schedule-label">
                  {t("arrivalTime")}
                </Typography>
                <Typography className="home-schedule-time">
                  7:30 a.m.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} className="home-schedule-card">
                <AccessTimeOutlinedIcon className="home-schedule-icon" />
                <Typography className="home-schedule-label">
                  {t("dockReturn")}
                </Typography>
                <Typography className="home-schedule-time">
                  4:00 p.m.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="home-map-section">
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            className="home-map-header"
          >
            <PlaceOutlinedIcon className="home-map-icon" />
            <Typography component="h2" className="title-home color-blue-dark">
              {t("homeLocationTitle")}
            </Typography>
          </Stack>
          <Typography className="home-map-subtitle" textAlign="center">
            {t("IslandsSector")} · Zaragoza, Colombia
          </Typography>
        </Container>
        <Box className="home-map-frame">
          <iframe
            title={t("homeLocationTitle")}
            src={MAP_EMBED_URL}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
