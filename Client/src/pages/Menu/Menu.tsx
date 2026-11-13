import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";


import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useTranslation } from "react-i18next";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


import "./styleMenu.css";
import Footer from "../../components/Footer/Footer";

import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import { buildWhatsAppUrl } from "../../generalFunctions/generalFunction";
import {
  useScrollReveal,
  useScrollRevealMany,
} from "../../hooks/useScrollReveal";



interface DishData {
  name: string;
  descKey: string;
  image: string;
  label: string;
}

const FEATURED_DISHES: DishData[] = [
  {
    name: "miscela caraibica",
    descKey: "miscela",
    image: "/images/lunche/FOTOS PLATOS/caribeña_adicional.webp",
    label: "Specialità",
  },
  {
    name: "fra amici",
    descKey: "fraAmici",
    image: "/images/lunche/FOTOS PLATOS/fra_amici_adicional.webp",
    label: "Classico",
  },
];



const Menu = () => {
  const [open, setOpen] = useState(false);

  const DEFAULT_PHONE_NUMBER =
    import.meta.env.VITE_WHATSAPP_NUMBER ?? "573126056467";

  const DEFAULT_MESSAGE =
    import.meta.env.VITE_WHATSAPP_MESSAGE ?? "Hola, quiero más información.";

  const href = buildWhatsAppUrl(DEFAULT_PHONE_NUMBER, DEFAULT_MESSAGE);

  const { t } = useTranslation("home");

  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  const { ref: sectionTitleRef, isVisible: sectionTitleVisible } =
    useScrollReveal();
  const { setRef: setDishRef, visible: dishVisible } = useScrollRevealMany(
    FEATURED_DISHES.length,
  );


  const handleOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);

  };



  return (
    <Box>
      <Banner
        title="titleMenu1"
        titleTwo="titleMenu2"
        description="descriptionMenu"
        linkButton="menu"
        onClick={handleOpen}
        titleButton="viewMenu"
      />

      <Box className="container-menu-plates" component="section">
        {/* ── Private Vessel CTA ── */}
        <Box
          ref={ctaRef}
          className={`private-vessel-cta scroll-reveal ${ctaVisible ? "revealed" : ""}`}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.4rem", md: "2rem" },
              fontWeight: 300,
              color: "#fff",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              mb: 3,
              position: "relative",
              zIndex: 1,
            }}
          >
            {t("privateVessel")}
          </Typography>
          <a
            className="private-vessel-btn"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={DEFAULT_PHONE_NUMBER}
          >
            <span>{t("reservePrivate")}</span>
            <WhatsAppIcon sx={{ color: "#25D366", fontSize: 22 }} />
          </a>
        </Box>

        {/* ── Featured Dishes — Sticky Section ── */}
        <Box className="dishes-sticky-section" component="section">
          <Box
            ref={sectionTitleRef}
            className={`dishes-sticky-header scroll-reveal ${sectionTitleVisible ? "revealed" : ""}`}
          >
            <Typography
              component="h2"
              className="title-menu-some-plates"
              sx={{ fontSize: { xs: "2rem", md: "2.8rem" } }}
            >
              {t("someDises")}
            </Typography>
            <Box className="menu-section-divider" />
          </Box>

          <Box className="dishes-scroll-track">
            {FEATURED_DISHES.map((dish, i) => (
              <Box
                key={dish.descKey}
                ref={setDishRef(i)}
                className={`dish-showcase ${i % 2 !== 0 ? "reverse" : ""} scroll-reveal ${dishVisible[i] ? "revealed" : ""}`}
                sx={{ transitionDelay: `${i * 0.08}s` }}
              >
                <Box className="dish-image-wrapper">
                  <Box
                    component="img"
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                  />
                </Box>
                <Box className="dish-content">
                  <span className="dish-label">{dish.label}</span>
                  <Typography component="h3">{dish.name}</Typography>
                  <Typography component="p">{t(dish.descKey)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>


      </Box>

      {/* ── PDF Menu Dialog ── */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        <Box className="menu-dialog-header">
          <Typography variant="h6">{t("Menu")}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
            padding: "2rem",
            minHeight: 600,
            background: "#fafbfd",
          }}
        >

        </DialogContent>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Menu;
