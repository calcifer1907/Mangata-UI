import { Box, Typography, Button, Paper } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import {
  Groups as GroupsIcon,
  AccessTime as TimeIcon,
  DirectionsBoat as BoatIconMUI,
  Pool as SnorkelingIcon,
  LocalBar as BarIcon,
  MusicNote as MusicIcon,
  WbSunny as SunIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import "../Menu/styleMenu.css";
import Footer from "../../components/Footer/Footer";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import ImageCarousel from "../../components/Slider/Slider";
import Card from "../../components/Cards/Cards";

import BoatIcon from "../../assets/icons/Boat.svg";

const sampleImages = [
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
    id: "3",
    src: "images/Boat/IMG-03.jpg",
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

          <Button
            className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95 margin-top-8"
            onClick={() => {}}
            to="/BoatRental"
            component={NavLink}
          >
            {t("Reserve")}
          </Button>
        </Box>
      </Box>

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
              showControls={false}
              autoPlaySpeed={4000}
            />
          </Box>
          <Box className="d-flex align-items-center justify-content-center flex-direction-column  text-align-center content-descrition-plates">
            <Typography
              component="p"
              sx={{
                maxWidth: { xs: "90%", md: "80%", lg: "60%" },
                fontSize: { xs: "1rem", md: "1.2rem" },
                lineHeight: 1.8,
                marginTop: 2,
              }}
            >
              {t("descriptionBoat")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Sección de Características del Bote */}
      <Box
        sx={{
          maxWidth: { xs: "95%", md: "90%", lg: "85%" },
          margin: "0 auto",
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Typography
          className="color-blue-dark title-home"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("boatFeatures") || "Características del Bote"}
        </Typography>
        <Grid2 container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <GroupsIcon
                sx={{
                  fontSize: 48,
                  color: "var(--color-theme-dark-blue)",
                  mb: 2,
                }}
              />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatCapacity") || "Capacidad"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatCapacityDescription") || "Hasta 12 personas"}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <TimeIcon
                sx={{
                  fontSize: 48,
                  color: "var(--color-theme-dark-blue)",
                  mb: 2,
                }}
              />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatDuration") || "Duración"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatDurationDescription") || "4-8 horas personalizables"}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <BoatIconMUI
                sx={{
                  fontSize: 48,
                  color: "var(--color-theme-dark-blue)",
                  mb: 2,
                }}
              />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("boatType") || "Tipo de Bote"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("boatTypeDescription") || "Lancha rápida privada"}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <SecurityIcon
                sx={{
                  fontSize: 48,
                  color: "var(--color-theme-dark-blue)",
                  mb: 2,
                }}
              />
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
        sx={{
          maxWidth: { xs: "95%", md: "80%", lg: "70%" },
          margin: "0 auto",
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Typography
          className="color-blue-dark title-home"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("boatItinerary") || "Itinerario Sugerido"}
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SunIcon sx={{ fontSize: 32, color: "#1976d2", mr: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  {t("morningSchedule") || "Mañana"}
                </Typography>
              </Box>
              <Box sx={{ pl: 6 }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 1.5 }}
                  className="color-black-opacity"
                >
                  <strong>8:00 AM</strong> -{" "}
                  {t("departureTime") || "Salida desde el muelle"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1.5 }}
                  className="color-black-opacity"
                >
                  <strong>9:00 AM</strong> -{" "}
                  {t("islandTour") || "Recorrido por las islas"}
                </Typography>
                <Typography variant="body1" className="color-black-opacity">
                  <strong>10:00 AM</strong> -{" "}
                  {t("snorkelingActivity") || "Actividad de snorkel"}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SunIcon sx={{ fontSize: 32, color: "#f57c00", mr: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  {t("afternoonSchedule") || "Tarde"}
                </Typography>
              </Box>
              <Box sx={{ pl: 6 }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 1.5 }}
                  className="color-black-opacity"
                >
                  <strong>12:00 PM</strong> -{" "}
                  {t("lunchBreak") || "Almuerzo en playa"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1.5 }}
                  className="color-black-opacity"
                >
                  <strong>2:00 PM</strong> -{" "}
                  {t("relaxTime") || "Tiempo de relajación"}
                </Typography>
                <Typography variant="body1" className="color-black-opacity">
                  <strong>4:00 PM</strong> -{" "}
                  {t("returnTime") || "Regreso al muelle"}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>

      {/* Sección de Recomendaciones y Qué Traer */}
      <Box
        sx={{
          maxWidth: { xs: "95%", md: "80%", lg: "70%" },
          margin: "0 auto",
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <InfoIcon
                  sx={{
                    fontSize: 32,
                    color: "var(--color-theme-dark-blue)",
                    mr: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="color-blue-dark"
                >
                  {t("whatToBring") || "Qué Traer"}
                </Typography>
              </Box>
              <Box sx={{ pl: 6 }}>
                {[
                  t("bringSunscreen") || "Protector solar",
                  t("bringHat") || "Gorra o sombrero",
                  t("bringSwimsuit") || "Traje de baño",
                  t("bringTowel") || "Toalla",
                  t("bringCamera") || "Cámara o celular",
                  t("bringWater") || "Agua (opcional)",
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                  >
                    <CheckIcon
                      sx={{ color: "#4caf50", mr: 1.5, fontSize: 20 }}
                    />
                    <Typography variant="body1" className="color-black-opacity">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <SecurityIcon sx={{ fontSize: 32, color: "#2e7d32", mr: 2 }} />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#2e7d32" }}
                >
                  {t("safetyRecommendations") || "Recomendaciones de Seguridad"}
                </Typography>
              </Box>
              <Box sx={{ pl: 6 }}>
                {[
                  t("safetyLifeJacket") || "Chalecos salvavidas incluidos",
                  t("safetyCaptain") || "Capitán certificado y experimentado",
                  t("safetyWeather") || "Monitoreo de condiciones climáticas",
                  t("safetyFirstAid") || "Botiquín de primeros auxilios",
                  t("safetyCommunication") || "Equipo de comunicación a bordo",
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                  >
                    <CheckIcon
                      sx={{ color: "#4caf50", mr: 1.5, fontSize: 20 }}
                    />
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
        sx={{
          maxWidth: { xs: "95%", md: "85%" },
          margin: "0 auto",
          paddingBlock: { xs: 4, md: 6 },
        }}
      >
        <Typography
          className="color-blue-dark title-home"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("additionalExperiences") || "Experiencias Adicionales"}
        </Typography>
        <Grid2 container spacing={3}>
          {[
            {
              icon: <SnorkelingIcon />,
              title: t("snorkelingTour") || "Tour de Snorkel",
              description:
                t("snorkelingTourDesc") ||
                "Explora los arrecifes de coral y la vida marina",
            },
            {
              icon: <BarIcon />,
              title: t("sunsetTour") || "Tour al Atardecer",
              description:
                t("sunsetTourDesc") ||
                "Disfruta de un atardecer mágico en el mar",
            },
            {
              icon: <MusicIcon />,
              title: t("partyBoat") || "Bote Fiesta",
              description:
                t("partyBoatDesc") || "Celebra con música, bebidas y diversión",
            },
            {
              icon: <BoatIconMUI />,
              title: t("fishingTour") || "Tour de Pesca",
              description:
                t("fishingTourDesc") ||
                "Experiencia de pesca deportiva (opcional)",
            },
          ].map((experience, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  sx={{
                    color: "var(--color-theme-dark-blue)",
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
      <Box
        sx={{
          background:
            "linear-gradient(135deg, var(--color-theme-dark-blue) 0%, #3498db 100%)",
          paddingBlock: { xs: 4, md: 6 },
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            marginBottom: 2,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("readyForAdventure") || "¿Listo para tu Aventura?"}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#FFFFFF",
            marginBottom: 4,
            opacity: 0.9,
            fontSize: { xs: "1rem", md: "1.3rem" },
          }}
        >
          {t("bookNowMessage") ||
            "Reserva ahora y vive una experiencia inolvidable en el mar"}
        </Typography>
        <Button
          className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95"
          to="/BoatRental"
          component={NavLink}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "var(--color-theme-dark-blue)",
            padding: "12px 48px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          {t("Reserve")}
        </Button>
      </Box>

      <Footer />
    </Box>
  );
};

export default Boat;
