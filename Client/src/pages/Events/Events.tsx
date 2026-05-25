import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  Celebration as CelebrationIcon,
  BeachAccess as BeachIcon,
  Cake as CakeIcon,
  Groups as GroupsIcon,
  Business as BusinessIcon,
  EventAvailable as EventIcon,
  NavigateNext as NavigateNextIcon,
  JoinInner as JoinInnerIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";

import Merrried from "../../assets/Icons/Merrried.svg";
import Party from "../../assets/Icons/Party.svg";
import Champagne from "../../assets/Icons/Champagne.svg";

import {
  useScrollReveal,
  useScrollRevealMany,
} from "../../hooks/useScrollReveal";

import "./styleEvents.css";

const Events = () => {
  const { t } = useTranslation("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventTypes = [
    {
      titleKey: "events_type_weddings_title",
      descriptionKey: "events_type_weddings_desc",
      image: "/images/MangataBeach.webp",
      icon: <BeachIcon sx={{ fontSize: 24, color: "#fff" }} />,
      featured: true,
    },
    {
      titleKey: "events_type_birthdays_title",
      descriptionKey: "events_type_birthdays_desc",
      image: "/images/Events/IMG_02.webp",
      icon: <CakeIcon sx={{ fontSize: 24, color: "#fff" }} />,
      featured: true,
    },
    {
      titleKey: "events_type_marriage_proposal_title",
      descriptionKey: "events_type_marriage_proposal_desc",
      image: "/images/Events/IMG_05.webp",
      icon: <JoinInnerIcon sx={{ fontSize: 24, color: "#fff" }} />,
      featured: true,
    },
    {
      titleKey: "events_type_farewells_title",
      descriptionKey: "events_type_farewells_desc",
      image: "/images/Events/IMG_03.webp",
      icon: <CelebrationIcon sx={{ fontSize: 24, color: "#fff" }} />,
      featured: false,
    },
    {
      titleKey: "events_type_private_title",
      descriptionKey: "events_type_private_desc",
      image: "/images/Events/IMG_5512.webp",
      icon: <GroupsIcon sx={{ fontSize: 24, color: "#fff" }} />,
      featured: false,
    },
    {
      titleKey: "events_type_corporate_title",
      descriptionKey: "events_type_corporate_desc",
      image: "/images/Events/IMG_5511.webp",
      icon: <BusinessIcon sx={{ fontSize: 24, color: "#fff" }} />,
      featured: false,
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

  const { ref: introRef, isVisible: introVisible } = useScrollReveal();
  const { ref: stickyHeaderRef, isVisible: stickyHeaderVisible } =
    useScrollReveal();
  const { setRef: setEventRef, visible: eventVisible } = useScrollRevealMany(
    eventTypes.length,
  );
  const { ref: iconsRef, isVisible: iconsVisible } = useScrollReveal();
  const { ref: allInclusiveImageRef, isVisible: allInclusiveImageVisible } =
    useScrollReveal({ threshold: 0.1 });
  const { ref: allInclusiveTextRef, isVisible: allInclusiveTextVisible } =
    useScrollReveal({ threshold: 0.1 });
  const { ref: customizeImageRef, isVisible: customizeImageVisible } =
    useScrollReveal({ threshold: 0.1 });
  const { ref: customizeTextRef, isVisible: customizeTextVisible } =
    useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  return (
    <Box className="events-page">
      <Banner
        title="eventMangata"
        titleTwo="Mangata"
        description="descriptionEvents"
        titleButton="moreInformation"
        linkButton="Contact"
      />

      {/* ── Intro Section ── */}
      <Box
        ref={introRef}
        className={`events-intro events-scroll-reveal ${introVisible ? "revealed" : ""}`}
        component="section"
      >
        <span className="events-intro-overline">
          {t("events_allInclusive_overline")}
        </span>
        <Typography component="h2">{t("events_types_title")}</Typography>
        <Typography component="p">{t("events_types_subtitle")}</Typography>
      </Box>

      {/* ── Sticky Event Types Section ── */}
      <Box className="events-types-section" component="section">
        <Box
          ref={stickyHeaderRef}
          className={`events-types-sticky-header events-scroll-reveal ${stickyHeaderVisible ? "revealed" : ""}`}
        >
          <Typography component="h2">{t("events_types_title")}</Typography>
          <Box className="events-section-divider" />
        </Box>

        <Box className="events-scroll-track">
          {eventTypes.map((event, i) => (
            <Box
              key={event.titleKey}
              ref={setEventRef(i)}
              className={`event-showcase ${i % 2 !== 0 ? "reverse" : ""} ${
                i % 2 === 0 ? "events-scroll-reveal-left" : "events-scroll-reveal-right"
              } ${eventVisible[i] ? "revealed" : ""}`}
              sx={{ transitionDelay: `${i * 0.05}s` }}
            >
              <Box className="event-showcase-image">
                {event.featured && (
                  <span className="event-showcase-badge">
                    {t("events_featured")}
                  </span>
                )}
                <Box
                  component="img"
                  src={event.image}
                  alt={t(event.titleKey)}
                  loading="lazy"
                />
                <Box className="event-showcase-icon">
                  {React.cloneElement(event.icon)}
                </Box>
              </Box>

              <Box className="event-showcase-content">
                <Box className="event-showcase-line" />
                <Typography component="h3">{t(event.titleKey)}</Typography>
                <Typography component="p">
                  {t(event.descriptionKey)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Icons Band ── */}
      <Box
        ref={iconsRef}
        className={`events-icons-band events-scroll-reveal-scale ${iconsVisible ? "revealed" : ""}`}
      >
        <Box component="img" src={Merrried} alt="Wedding" />
        <Box component="img" src={Party} alt="Party" />
        <Box component="img" src={Champagne} alt="Celebration" />
      </Box>

      {/* ── All-Inclusive Section ── */}
      <Box className="events-fullwidth-section">
        <Box className="events-split-container">
          <Box
            ref={allInclusiveTextRef}
            className={`events-split-text dark-theme events-scroll-reveal-left ${allInclusiveTextVisible ? "revealed" : ""}`}
          >
            <span className="events-split-overline">
              {t("events_allInclusive_overline")}
            </span>
            <Typography component="h2">
              {t("events_allInclusive_title")}
            </Typography>
            <Typography component="p" className="split-subtitle">
              {t("events_allInclusive_subtitle")}
            </Typography>
            <Box className="events-list-grid">
              {eventIncludes.map((item) => (
                <Box key={item} className="events-list-item">
                  <span>{t(item)}</span>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            ref={allInclusiveImageRef}
            className={`events-split-image events-scroll-reveal-right ${allInclusiveImageVisible ? "revealed" : ""}`}
          >
            <Box
              component="img"
              src="/images/MangataBeach.webp"
              alt="Mangata Beach Events"
              loading="lazy"
            />
          </Box>
        </Box>
      </Box>

      {/* ── Customize Section ── */}
      <Box className="events-fullwidth-section" sx={{ mt: 0 }}>
        <Box className="events-split-container">
          <Box
            ref={customizeImageRef}
            className={`events-split-image events-scroll-reveal-left ${customizeImageVisible ? "revealed" : ""}`}
          >
            <Box
              component="img"
              src="/images/MangataChampagne.webp"
              alt="Mangata Champagne"
              loading="lazy"
            />
          </Box>

          <Box
            ref={customizeTextRef}
            className={`events-split-text brand-theme events-scroll-reveal-right ${customizeTextVisible ? "revealed" : ""}`}
          >
            <Typography component="h2">
              {t("events_customize_title")}
            </Typography>
            <Typography component="p" className="split-subtitle">
              {t("events_customize_subtitle")}
            </Typography>
            <Box className="events-list-grid">
              {additionalServices.map((service) => (
                <Box key={service} className="events-list-item">
                  <span>{t(service)}</span>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── CTA Section ── */}
      <Box
        ref={ctaRef}
        className={`events-cta events-scroll-reveal-scale ${ctaVisible ? "revealed" : ""}`}
        component="section"
      >
        <Typography component="h3">{t("events_cta_title")}</Typography>
        <Typography component="p">{t("events_cta_subtitle")}</Typography>
        <NavLink to="/Contact" className="events-cta-btn">
          <EventIcon sx={{ fontSize: 20 }} />
          <span>{t("events_cta_button")}</span>
          <NavigateNextIcon sx={{ fontSize: 20 }} />
        </NavLink>
      </Box>

      <Footer />
    </Box>
  );
};

export default Events;
