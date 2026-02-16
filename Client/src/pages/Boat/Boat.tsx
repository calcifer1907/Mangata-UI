import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  Container,
} from "@mui/material";
import Grid2 from "@mui/material/Grid";
import {
  Groups as GroupsIcon,
  AccessTime as TimeIcon,
  DirectionsBoat as BoatIconMUI,
  LocalBar as BarIcon,
  MusicNote as MusicIcon,
  WbSunny as SunIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  NavigateNext as NavigateNextIcon,
  EventAvailable as EventIcon,
} from "@mui/icons-material";

import "../Menu/styleMenu.css";
import "./Boat.scss";
import Footer from "../../components/Footer/Footer";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import ImageCarousel from "../../components/Slider/Slider";
import Banner from "../../components/Banner/Banner";
import { createEventsStyles } from "../Events/Events.styles";
import { useEffect } from "react";

const sampleImages = [
  {
    id: "3",
    src: "images/Boat/IMG-03.jpg",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "1",
    src: "images/Boat/IMG-01.jpg",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "2",
    src: "images/Boat/IMG-02.jpg",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "4",
    src: "images/Boat/IMG-04.jpg",
    alt: "",
    title: "",
    description: "",
  },
  {
    id: "5",
    src: "images/Boat/IMG-05.jpg",
    alt: "",
    title: "",
    description: "",
  },
];

const Boat = () => {
  const theme = useTheme();
  const { t } = useTranslation("home");
  const styles = createEventsStyles(theme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box>
      <Banner
        title="titleDayTripDescription2"
        titleTwo="titleDayTripDescription3"
        description="descriptionBoat"
        linkButton="BoatRental"
      />
      <Box>
        <Box className="d-flex align-items-center justify-content-center flex-wrap flex-row gap-8"></Box>
        <Box
          className="d-flex align-items-center justify-content-center container-boat"
          component="section"
        >
          <Box className="initial-summary-image">
            <ImageCarousel
              images={sampleImages}
              height={window.innerWidth < 600 ? 500 : 650}
              variant="full"
              showIndicators={true}
              transition="slide"
              showControls
              autoPlaySpeed={4000}
            />
          </Box>
          <Box className="d-flex align-items-center justify-content-center flex-direction-column  text-align-center content-descrition-plates">
            <Typography
              component="p"
              className="boat-description-text"
              sx={{
                maxWidth: { xs: "90%", md: "80%", lg: "60%" },
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              {t("descriptionBoat")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Sección de Características del Bote */}
      <Box
        className="boat-section-container"
        sx={{
          maxWidth: { xs: "95%", md: "90%", lg: "85%" },
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Typography
          className="color-blue-dark title-home boat-section-title"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("boatFeatures") || "Características del Bote"}
        </Typography>
        <Grid2 container spacing={3} className="boat-features-grid">
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} className="boat-feature-card">
              <GroupsIcon className="boat-feature-icon" />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatCapacity") || "Capacidad"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatCapacityDescription") || "Hasta 12 personas"}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} className="boat-feature-card">
              <TimeIcon className="boat-feature-icon" />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatDuration") || "Duración"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatDurationDescription") || "4-8 horas personalizables"}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} className="boat-feature-card">
              <BoatIconMUI className="boat-feature-icon" />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatType") || "Tipo de Bote"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatTypeDescription") || "Lancha rápida privada"}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} className="boat-feature-card">
              <SecurityIcon className="boat-feature-icon" />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatSafety") || "Seguridad"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatSafetyDescription") ||
                  "Capitán experimentado y equipo de seguridad"}
              </Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>

      {/* Sección de Itinerario */}
      <Box
        className="boat-section-container"
        sx={{
          maxWidth: { xs: "95%", md: "80%", lg: "70%" },
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Typography
          className="color-blue-dark title-home boat-section-title"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("boatItinerary") || "Itinerario Sugerido"}
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              className="boat-itinerary-card boat-itinerary-card-morning"
            >
              <Box className="boat-itinerary-header">
                <SunIcon className="boat-itinerary-icon-morning" />
                <Typography variant="h6" fontWeight="bold">
                  {t("morningSchedule") || "Mañana"}
                </Typography>
              </Box>
              <Box className="boat-itinerary-content">
                <Typography
                  variant="body1"
                  className="color-black-opacity boat-itinerary-item"
                >
                  <strong>8:00 AM</strong> -{" "}
                  {t("departureTime") || "Salida desde el muelle"}
                </Typography>
                <Typography
                  variant="body1"
                  className="color-black-opacity boat-itinerary-item"
                >
                  <strong>9:00 AM</strong> -{" "}
                  {t("islandTour") || "Recorrido por las islas"}
                </Typography>
                <Typography
                  variant="body1"
                  className="color-black-opacity boat-itinerary-item"
                >
                  <strong>10:00 AM</strong> -{" "}
                  {t("snorkelingActivity") || "Actividad de snorkel"}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              className="boat-itinerary-card boat-itinerary-card-afternoon"
            >
              <Box className="boat-itinerary-header">
                <SunIcon className="boat-itinerary-icon-afternoon" />
                <Typography variant="h6" fontWeight="bold">
                  {t("afternoonSchedule") || "Tarde"}
                </Typography>
              </Box>
              <Box className="boat-itinerary-content">
                <Typography
                  variant="body1"
                  className="color-black-opacity boat-itinerary-item"
                >
                  <strong>12:00 PM</strong> -{" "}
                  {t("lunchBreak") || "Almuerzo en playa"}
                </Typography>
                <Typography
                  variant="body1"
                  className="color-black-opacity boat-itinerary-item"
                >
                  <strong>2:00 PM</strong> -{" "}
                  {t("relaxTime") || "Tiempo de relajación"}
                </Typography>
                <Typography
                  variant="body1"
                  className="color-black-opacity boat-itinerary-item"
                >
                  <strong>4:00 PM</strong> -{" "}
                  {t("returnTime") || "Regreso al muelle"}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              className="boat-recommendations-card boat-recommendations-card-safety"
            >
              <Box className="boat-recommendations-header">
                <SecurityIcon className="boat-recommendations-icon-safety" />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="boat-safety-title"
                >
                  {t("safetyRecommendations") || "Recomendaciones de Seguridad"}
                </Typography>
              </Box>
              <Box className="boat-recommendations-content">
                {[
                  t("safetyLifeJacket") || "Chalecos salvavidas incluidos",
                  t("safetyCaptain") || "Capitán certificado y experimentado",
                  t("safetyFirstAid") || "Botiquín de primeros auxilios",
                  t("safetyCommunication") || "Equipo de comunicación a bordo",
                ].map((item, index) => (
                  <Box key={index} className="boat-recommendations-item">
                    <CheckIcon className="boat-recommendations-check-icon" />
                    <Typography variant="body1" className="color-black-opacity">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>

      {/* Sección de Experiencias Adicionales */}
      <Box
        className="boat-section-container"
        sx={{
          maxWidth: { xs: "95%", md: "85%" },
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Typography
          className="color-blue-dark title-home boat-section-title"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("additionalExperiences") || "Experiencias Adicionales"}
        </Typography>
        <Grid2 container spacing={4}>
          {[
            {
              icon: <BarIcon />,
              title: t("sunsetTour") || "Tour al Atardecer",
              description: t("sunsetTourDesc"),
            },
            {
              icon: <MusicIcon />,
              title: t("partyBoat") || "Bote Fiesta",
              description:
                t("partyBoatDesc") || "Celebra con música, bebidas y diversión",
            },
            {
              icon: <BoatIconMUI />,
              title: t("IslasTour"),
              description: t("IslasTourDesc"),
            },
          ].map((experience, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper elevation={2} className="boat-experience-card">
                <Box className="boat-experience-icon-container">
                  {experience.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {experience.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {experience.description}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Call to Action Final */}
      <Container maxWidth="lg" sx={styles.container}>
        <Paper elevation={0} sx={styles.ctaPaper}>
          <Box sx={styles.ctaOverlay} />

          <Typography variant="h4" component="h3" sx={styles.ctaTitle}>
            {t("readyForAdventure")}
          </Typography>

          <Typography variant="h6" sx={styles.ctaSubtitle}>
            {t("bookNowMessage")}
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
            endIcon={<NavigateNextIcon />}
            component={NavLink}
            to="/BoatRental"
            sx={styles.ctaButton}
          >
            {t("Reserve")}
          </Button>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default Boat;
