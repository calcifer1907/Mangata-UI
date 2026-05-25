import { Box, Typography, Button } from "@mui/material";
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
  Anchor as AnchorIcon,
  WaterDrop as WaterIcon,
} from "@mui/icons-material";

import "./Boat.scss";
import Footer from "../../components/Footer/Footer";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import ImageCarousel from "../../components/Slider/Slider";
import Banner from "../../components/Banner/Banner";
import {
  useScrollReveal,
  useScrollRevealMany,
} from "../../hooks/useScrollReveal";
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

const features = [
  {
    icon: <GroupsIcon />,
    titleKey: "boatCapacity",
    fallback: "Capacidad",
    descKey: "boatCapacityDescription",
    descFallback: "Hasta 12 personas",
  },
  {
    icon: <TimeIcon />,
    titleKey: "boatDuration",
    fallback: "Duración",
    descKey: "boatDurationDescription",
    descFallback: "4-8 horas personalizables",
  },
  {
    icon: <BoatIconMUI />,
    titleKey: "boatType",
    fallback: "Tipo de Bote",
    descKey: "boatTypeDescription",
    descFallback: "Lancha rápida privada",
  },
  {
    icon: <SecurityIcon />,
    titleKey: "boatSafety",
    fallback: "Seguridad",
    descKey: "boatSafetyDescription",
    descFallback: "Capitán experimentado y equipo de seguridad",
  },
];

const experiences = [
  {
    icon: <BarIcon sx={{ fontSize: 24, color: "#fff" }} />,
    titleKey: "sunsetTour",
    fallback: "Tour al Atardecer",
    descKey: "sunsetTourDesc",
    descFallback: "Disfruta de un paseo al atardecer con vistas únicas",
    image: "images/Boat/IMG-01.jpg",
  },
  {
    icon: <MusicIcon sx={{ fontSize: 24, color: "#fff" }} />,
    titleKey: "partyBoat",
    fallback: "Bote Fiesta",
    descKey: "partyBoatDesc",
    descFallback: "Celebra con música, bebidas y diversión",
    image: "images/Boat/IMG-04.jpg",
  },
  {
    icon: <BoatIconMUI sx={{ fontSize: 24, color: "#fff" }} />,
    titleKey: "IslasTour",
    fallback: "Tour por las Islas",
    descKey: "IslasTourDesc",
    descFallback: "Explora las islas más hermosas de la región",
    image: "images/Boat/IMG-05.jpg",
  },
];

const Boat = () => {
  const { t } = useTranslation("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: introRef, isVisible: introVisible } = useScrollReveal();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollReveal({
    threshold: 0.1,
  });
  const { ref: featuresHeaderRef, isVisible: featuresHeaderVisible } =
    useScrollReveal();
  const { setRef: setFeatureRef, visible: featureVisible } =
    useScrollRevealMany(features.length);
  const { ref: itineraryRef, isVisible: itineraryVisible } = useScrollReveal();
  const { ref: morningRef, isVisible: morningVisible } = useScrollReveal();
  const { ref: afternoonRef, isVisible: afternoonVisible } = useScrollReveal();
  const { ref: safetyImageRef, isVisible: safetyImageVisible } =
    useScrollReveal({ threshold: 0.1 });
  const { ref: safetyTextRef, isVisible: safetyTextVisible } = useScrollReveal({
    threshold: 0.1,
  });
  const { ref: expHeaderRef, isVisible: expHeaderVisible } = useScrollReveal();
  const { setRef: setExpRef, visible: expVisible } = useScrollRevealMany(
    experiences.length,
  );
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  return (
    <Box className="boat-page">
      <Banner
        title="titleDayTripDescription2"
        titleTwo="titleDayTripDescription3"
        description="descriptionBoat"
        linkButton="BoatRental"
      />

      {/* ── Intro Section ── */}
      <Box
        ref={introRef}
        className={`boat-intro events-scroll-reveal ${introVisible ? "revealed" : ""}`}
        component="section"
      >
        <span className="boat-intro-overline">
          <AnchorIcon sx={{ fontSize: 14 }} />
          {t("boatExperience") || "Experiencia Náutica"}
        </span>
        <Typography component="h2">{t("descriptionBoat")}</Typography>
      </Box>

      {/* ── Image Carousel ── */}
      <Box
        ref={carouselRef}
        className={`boat-carousel-section events-scroll-reveal-scale ${carouselVisible ? "revealed" : ""}`}
      >
        <Box className="boat-carousel-wrapper">
          <ImageCarousel
            images={sampleImages}
            height={window.innerWidth < 600 ? 420 : 560}
            variant="full"
            showIndicators
            transition="slide"
            showControls
            autoPlaySpeed={4000}
          />
        </Box>
      </Box>

      {/* ── Features Section ── */}
      <Box className="boat-features-section" component="section">
        <Box
          ref={featuresHeaderRef}
          className={`boat-section-header events-scroll-reveal ${featuresHeaderVisible ? "revealed" : ""}`}
        >
          <Typography component="h2">
            {t("boatFeatures") || "Características del Bote"}
          </Typography>
          <Box className="boat-section-divider" />
        </Box>

        <Box className="boat-features-grid">
          {features.map((feat, i) => (
            <Box
              key={feat.titleKey}
              ref={setFeatureRef(i)}
              className={`boat-feature-item events-scroll-reveal ${featureVisible[i] ? "revealed" : ""}`}
              sx={{ transitionDelay: `${i * 0.1}s` }}
            >
              <Box className="boat-feature-icon-circle">{feat.icon}</Box>
              <Typography component="h3">
                {t(feat.titleKey) || feat.fallback}
              </Typography>
              <Typography component="p">
                {t(feat.descKey) || feat.descFallback}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Itinerary Section ── */}
      <Box className="boat-itinerary-section" component="section">
        <Box
          ref={itineraryRef}
          className={`boat-section-header events-scroll-reveal ${itineraryVisible ? "revealed" : ""}`}
        >
          <Typography component="h2">
            {t("boatItinerary") || "Itinerario Sugerido"}
          </Typography>
          <Box className="boat-section-divider" />
        </Box>

        <Box className="boat-timeline">
          <Box className="boat-timeline-line" />

          <Box
            ref={morningRef}
            className={`boat-timeline-block events-scroll-reveal-left ${morningVisible ? "revealed" : ""}`}
          >
            <Box className="boat-timeline-dot morning" />
            <Box className="boat-timeline-card morning">
              <Box className="boat-timeline-card-header">
                <SunIcon />
                <Typography component="h3">
                  {t("morningSchedule") || "Mañana"}
                </Typography>
              </Box>
              <Box className="boat-timeline-items">
                <Box className="boat-timeline-entry">
                  <span className="boat-time">8:00 AM</span>
                  <span className="boat-activity">
                    {t("departureTime") || "Salida desde el muelle"}
                  </span>
                </Box>
                <Box className="boat-timeline-entry">
                  <span className="boat-time">9:00 AM</span>
                  <span className="boat-activity">
                    {t("islandTour") || "Recorrido por las islas"}
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            ref={afternoonRef}
            className={`boat-timeline-block right events-scroll-reveal-right ${afternoonVisible ? "revealed" : ""}`}
          >
            <Box className="boat-timeline-dot afternoon" />
            <Box className="boat-timeline-card afternoon">
              <Box className="boat-timeline-card-header">
                <SunIcon />
                <Typography component="h3">
                  {t("afternoonSchedule") || "Tarde"}
                </Typography>
              </Box>
              <Box className="boat-timeline-items">
                <Box className="boat-timeline-entry">
                  <span className="boat-time">12:00 PM</span>
                  <span className="boat-activity">
                    {t("lunchBreak") || "Almuerzo en playa"}
                  </span>
                </Box>
                <Box className="boat-timeline-entry">
                  <span className="boat-time">2:00 PM</span>
                  <span className="boat-activity">
                    {t("relaxTime") || "Tiempo de relajación"}
                  </span>
                </Box>
                <Box className="boat-timeline-entry">
                  <span className="boat-time">4:00 PM</span>
                  <span className="boat-activity">
                    {t("returnTime") || "Regreso al muelle"}
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Safety Split Section ── */}
      <Box className="boat-fullwidth-section">
        <Box className="boat-split-container">
          <Box
            ref={safetyImageRef}
            className={`boat-split-image events-scroll-reveal-left ${safetyImageVisible ? "revealed" : ""}`}
          >
            <Box
              component="img"
              src="images/Boat/IMG-02.jpg"
              alt="Boat Safety"
              loading="lazy"
            />
          </Box>

          <Box
            ref={safetyTextRef}
            className={`boat-split-text events-scroll-reveal-right ${safetyTextVisible ? "revealed" : ""}`}
          >
            <span className="boat-split-overline">
              <SecurityIcon sx={{ fontSize: 14 }} />
              {t("safetyRecommendations") || "Seguridad"}
            </span>
            <Typography component="h2">
              {t("safetyRecommendations") || "Recomendaciones de Seguridad"}
            </Typography>
            <Typography component="p" className="boat-split-subtitle">
              {t("boatSafetyDescription") ||
                "Tu seguridad es nuestra prioridad. Navegamos con los más altos estándares."}
            </Typography>
            <Box className="boat-safety-list">
              {[
                t("safetyLifeJacket") || "Chalecos salvavidas incluidos",
                t("safetyCaptain") || "Capitán certificado y experimentado",
                t("safetyFirstAid") || "Botiquín de primeros auxilios",
                t("safetyCommunication") || "Equipo de comunicación a bordo",
              ].map((item, index) => (
                <Box key={index} className="boat-safety-item">
                  <CheckIcon />
                  <span>{item}</span>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Experiences Section ── */}
      <Box className="boat-experiences-section" component="section">
        <Box
          ref={expHeaderRef}
          className={`boat-section-header events-scroll-reveal ${expHeaderVisible ? "revealed" : ""}`}
        >
          <span className="boat-intro-overline">
            <WaterIcon sx={{ fontSize: 14 }} />
            {t("additionalExperiences") || "Experiencias"}
          </span>
          <Typography component="h2">
            {t("additionalExperiences") || "Experiencias Adicionales"}
          </Typography>
          <Box className="boat-section-divider" />
        </Box>

        <Box className="boat-experiences-track">
          {experiences.map((exp, i) => (
            <Box
              key={exp.titleKey}
              ref={setExpRef(i)}
              className={`boat-experience-showcase ${i % 2 !== 0 ? "reverse" : ""} ${
                i % 2 === 0
                  ? "events-scroll-reveal-left"
                  : "events-scroll-reveal-right"
              } ${expVisible[i] ? "revealed" : ""}`}
              sx={{ transitionDelay: `${i * 0.05}s` }}
            >
              <Box className="boat-experience-image">
                <Box
                  component="img"
                  src={exp.image}
                  alt={t(exp.titleKey) || exp.fallback}
                  loading="lazy"
                />
                <Box className="boat-experience-icon-badge">{exp.icon}</Box>
              </Box>

              <Box className="boat-experience-content">
                <Box className="boat-experience-line" />
                <Typography component="h3">
                  {t(exp.titleKey) || exp.fallback}
                </Typography>
                <Typography component="p">
                  {t(exp.descKey) || exp.descFallback}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── CTA Section ── */}
      <Box
        ref={ctaRef}
        className={`boat-cta events-scroll-reveal-scale ${ctaVisible ? "revealed" : ""}`}
        component="section"
      >
        <Typography component="h3">{t("readyForAdventure")}</Typography>
        <Typography component="p">{t("bookNowMessage")}</Typography>
        <Button
          component={NavLink}
          to="/BoatRental"
          className="boat-cta-btn"
          disableRipple
        >
          <EventIcon sx={{ fontSize: 20 }} />
          <span>{t("Reserve")}</span>
          <NavigateNextIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>

      <Footer />
    </Box>
  );
};

export default Boat;
