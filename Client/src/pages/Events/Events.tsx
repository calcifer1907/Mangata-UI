import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Chip,
  useTheme,
  Avatar,
  alpha,
} from "@mui/material";

import {
  Celebration as CelebrationIcon,
  BeachAccess as BeachIcon,
  Cake as CakeIcon,
  Groups as GroupsIcon,
  Business as BusinessIcon,
  NavigateNext as NavigateNextIcon,
  EventAvailable as EventIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import Footer from "../../components/Footer/Footer";

import Banner from "../../components/Banner/Banner";
import Merrried from "../../assets/icons/Merrried.svg";
import Party from "../../assets/icons/Party.svg";
import Champagne from "../../assets/icons/Champagne.svg";

import { createEventsStyles } from "./Events.styles";

const Events = () => {
  const theme = useTheme();
  const { t } = useTranslation("home");
  const styles = createEventsStyles(theme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventTypes = [
    {
      titleKey: "events_type_weddings_title",
      descriptionKey: "events_type_weddings_desc",
      image: "/images/MangataBeach.webp",
      icon: <BeachIcon />,
      color: "#2E86DE", // Azul mar
      featured: true,
    },
    {
      titleKey: "events_type_birthdays_title",
      descriptionKey: "events_type_birthdays_desc",
      image: "/images/Events/IMG_02.webp",
      icon: <CakeIcon />,
      color: "#FF6B6B", // Coral suave
      featured: true,
    },
    {
      titleKey: "events_type_marriage_proposal_title",
      descriptionKey: "events_type_marriage_proposal_desc",
      image: "/images/Events/IMG_05.webp",
      icon: <CakeIcon />,
      color: "#FF6B6B", // Coral suave
      featured: true,
    },
    {
      titleKey: "events_type_farewells_title",
      descriptionKey: "events_type_farewells_desc",
      image: "/images/Events/IMG_03.webp",
      icon: <CelebrationIcon />,
      color: "#8E44AD", // Púrpura
    },
    {
      titleKey: "events_type_private_title",
      descriptionKey: "events_type_private_desc",
      image: "/images/Events/IMG_01.webp",
      icon: <GroupsIcon />,
      color: "#27AE60", // Verde
    },
    {
      titleKey: "events_type_corporate_title",
      descriptionKey: "events_type_corporate_desc",
      image: "/images/Events/IMG_01.webp",
      icon: <BusinessIcon />,
      color: "#34495E", // Azul corporativo (gris azulado)
    },
  ];

  const eventIncludes = [
    "events_includes_1",
    "events_includes_2",
    "events_includes_3",
    "events_includes_4",
    "events_includes_5",
    "events_includes_6",
    "events_includes_7",
    "events_includes_8",
  ];

  const additionalServices = [
    "events_additional_1",
    "events_additional_2",
    "events_additional_3",
    "events_additional_4",
    "events_additional_5",
    "events_additional_6",
    "events_additional_7",
  ];

  const eventIncludesImage = "/images/MangataBeach.webp";
  const additionalServicesImage = "/images/MangataChampagne.webp";

  return (
    <Box sx={styles.page}>
      <Banner
        title="eventMangata"
        titleTwo="Mangata"
        description="descriptionEvents"
        titleButton="moreInformation"
        linkButton="Contact"
      />
      <Container maxWidth="lg" sx={styles.container}>
        <Box sx={styles.section}>
          <Box sx={styles.sectionTitleRow}>
            <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
              {t("events_types_title")}
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            align="center"
            sx={styles.sectionSubtitle}
          >
            {t("events_types_subtitle")}
          </Typography>

          {/* Contenedor FLEX para las cards */}
          <Box sx={styles.cardsWrapper}>
            {eventTypes.map((event) => (
              <Paper
                key={event.titleKey}
                elevation={2}
                sx={styles.eventCard(event.color)}
              >
                {/* Imagen tipo Home + overlay */}
                <Box sx={styles.eventImageWrap}>
                  <Box
                    component="img"
                    src={event.image}
                    alt={t(event.titleKey)}
                    className="event-image"
                    sx={styles.eventImage}
                  />

                  {/* Overlay para legibilidad */}
                  <Box sx={styles.eventImageOverlay} />

                  {!!event.featured && (
                    <Chip
                      label={t("events_featured")}
                      size="small"
                      sx={styles.featuredChip}
                    />
                  )}

                  <Box sx={styles.eventTitleRow}>
                    <Avatar className="event-icon" sx={styles.eventIcon}>
                      {React.cloneElement(event.icon, {
                        sx: {
                          fontSize: 22,
                          color: "white",
                        },
                      })}
                    </Avatar>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={styles.eventTitle}
                    >
                      {t(event.titleKey)}
                    </Typography>
                  </Box>
                </Box>

                {/* Contenido */}
                <Box sx={styles.eventContent}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.eventDescription}
                  >
                    {t(event.descriptionKey)}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Sección de servicios incluidos */}
        <Box sx={styles.fullWidthSection}>
          <Grid container sx={styles.splitContainer}>
            {/* Panel izquierdo (texto) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={styles.allInclusiveTextPanel}>
                <Box sx={styles.splitContentWrap}>
                  <Typography variant="overline" sx={styles.overline}>
                    {t("events_allInclusive_overline")}
                  </Typography>

                  <Typography
                    variant="h3"
                    component="h2"
                    sx={styles.splitTitle}
                  >
                    {t("events_allInclusive_title")}
                  </Typography>

                  <Typography variant="subtitle1" sx={styles.splitSubtitle}>
                    {t("events_allInclusive_subtitle")}
                  </Typography>

                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {eventIncludes.map((item) => (
                      <Grid
                        key={item}
                        size={{ xs: 12, sm: 6 }}
                        sx={{
                          borderBottom: `1px solid ${alpha("#fff", 0.12)}`,
                        }}
                      >
                        <Box sx={styles.splitListRow}>
                          <Typography variant="body1" sx={styles.splitListText}>
                            {t(item)}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>

            {/* Panel derecho (imagen) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={styles.splitImagePanel(eventIncludesImage)} />
            </Grid>
          </Grid>
        </Box>

        <Box className="d-flex align-items-center justify-content-center flex-wrap flex-row gap-16">
          <Box
            component="img"
            src={Merrried}
            alt="Mangata Beach"
            width={{ xs: 80, lg: 80 }}
          />
          <Box
            component="img"
            src={Party}
            alt="Mangata Beach"
            width={{ xs: 80, lg: 80 }}
          />
          <Box
            component="img"
            src={Champagne}
            alt="Mangata Beach"
            width={{ xs: 80, lg: 80 }}
          />
        </Box>

        {/* Personaliza tu experiencia */}
        <Box sx={{ ...styles.fullWidthSection, marginBottom: 4 }}>
          <Grid container sx={styles.splitContainer}>
            {/* Panel izquierdo (imagen) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={styles.splitImagePanel(additionalServicesImage)} />
            </Grid>

            {/* Panel derecho (texto) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={styles.customizeTextPanel}>
                <Box sx={styles.splitContentWrap}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={styles.splitTitle}
                  >
                    {t("events_customize_title")}
                  </Typography>

                  <Typography variant="subtitle1" sx={styles.splitSubtitle}>
                    {t("events_customize_subtitle")}
                  </Typography>

                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {additionalServices.map((service) => (
                      <Grid
                        key={service}
                        size={{ xs: 12, sm: 6 }}
                        sx={{
                          borderBottom: `1px solid ${alpha("#fff", 0.12)}`,
                        }}
                      >
                        <Box sx={styles.splitListRow}>
                          <Typography variant="body1" sx={styles.splitListText}>
                            {t(service)}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Llamada a la acción */}
        <Paper elevation={0} sx={styles.ctaPaper}>
          <Box sx={styles.ctaOverlay} />

          <Typography variant="h4" component="h3" sx={styles.ctaTitle}>
            {t("events_cta_title")}
          </Typography>

          <Typography variant="h6" sx={styles.ctaSubtitle}>
            {t("events_cta_subtitle")}
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
            endIcon={<NavigateNextIcon />}
            component={NavLink}
            to="/Contact"
            sx={styles.ctaButton}
          >
            {t("events_cta_button")}
          </Button>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Events;
