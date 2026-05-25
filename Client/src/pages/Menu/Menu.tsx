import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import { Document, Page, pdfjs } from "react-pdf";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useTranslation } from "react-i18next";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import workerUrl from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url";

import "./styleMenu.css";
import Footer from "../../components/Footer/Footer";

import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import { buildWhatsAppUrl } from "../../generalFunctions/generalFunction";
import {
  useScrollReveal,
  useScrollRevealMany,
} from "../../hooks/useScrollReveal";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

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

const GRID_DISHES: DishData[] = [
  {
    name: "delizia del mare",
    descKey: "dish5811",
    image: "/images/lunche/FOTOS PLATOS/IMG_5811.webp",
    label: "Dal Mare",
  },
  {
    name: "sapore tropicale",
    descKey: "dish5812",
    image: "/images/lunche/FOTOS PLATOS/IMG_5812.webp",
    label: "Tropicale",
  },
  {
    name: "brezza caraibica",
    descKey: "dish5813",
    image: "/images/lunche/FOTOS PLATOS/IMG_5813.webp",
    label: "Tradizionale",
  },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentError, setDocumentError] = useState<string | null>(null);

  const DEFAULT_PHONE_NUMBER =
    import.meta.env.VITE_WHATSAPP_NUMBER ?? "573126056467";

  const DEFAULT_MESSAGE =
    import.meta.env.VITE_WHATSAPP_MESSAGE ?? "Hola, quiero más información.";

  const href = buildWhatsAppUrl(DEFAULT_PHONE_NUMBER, DEFAULT_MESSAGE);

  const { t } = useTranslation("home");

  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  const { ref: sectionTitleRef, isVisible: sectionTitleVisible } =
    useScrollReveal();
  const { ref: highlightRef, isVisible: highlightVisible } = useScrollReveal();
  const { setRef: setDishRef, visible: dishVisible } = useScrollRevealMany(
    FEATURED_DISHES.length,
  );
  const { setRef: setGridRef, visible: gridVisible } = useScrollRevealMany(
    GRID_DISHES.length,
  );

  const handleOpen = () => {
    setOpen(true);
    setDocumentError(null);
  };
  const handleClose = () => {
    setOpen(false);
    setPageNumber(1);
    setDocumentError(null);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setDocumentError(null);
  }

  function onDocumentLoadError(error: unknown) {
    if (error instanceof Error) {
      setDocumentError(error.message);
    } else if (typeof error === "string") {
      setDocumentError(error);
    } else {
      setDocumentError("Unknown error");
    }
  }

  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
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

        {/* ── Highlight band ── */}
        <Box
          ref={highlightRef}
          className={`menu-highlight-band scroll-reveal ${highlightVisible ? "revealed" : ""}`}
        >
          <Typography component="h2" className="highlight-title">
            {t("menuHighlightTitle")}
          </Typography>
          <Typography component="p" className="highlight-subtitle">
            {t("menuHighlightSubtitle")}
          </Typography>
        </Box>

        {/* ── More Dishes Grid ── */}
        <Box className="dishes-grid-section" component="section">
          {GRID_DISHES.map((dish, i) => (
            <Box
              key={dish.descKey}
              ref={setGridRef(i)}
              className={`dish-grid-card scroll-reveal ${gridVisible[i] ? "revealed" : ""}`}
              sx={{ transitionDelay: `${i * 0.1}s` }}
            >
              <Box className="dish-grid-image">
                <Box
                  component="img"
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                />
                <span className="dish-grid-label">{dish.label}</span>
              </Box>
              <Box className="dish-grid-body">
                <Typography component="h3">{dish.name}</Typography>
                <Typography component="p">{t(dish.descKey)}</Typography>
              </Box>
            </Box>
          ))}
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
          <Document
            file="/CartaMangata.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<Loading />}
            error={
              <Box sx={{ padding: "2rem", textAlign: "center" }}>
                <Typography sx={{ color: "error.main", mb: 1 }}>
                  {t("errorPDF")}
                </Typography>
                {documentError && (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    {documentError}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t("ensurePDFExists")}
                </Typography>
              </Box>
            }
          >
            <Box
              sx={{
                mb: 1,
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Page
                pageNumber={pageNumber}
                width={Math.min(800, window.innerWidth - 100)}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<Loading />}
              />
            </Box>
          </Document>
          {numPages && numPages > 1 && (
            <Box className="menu-pdf-nav">
              <IconButton
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                aria-label="Página anterior"
                size="small"
              >
                <NavigateBefore />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {t("page")} {pageNumber} {t("of")} {numPages}
              </Typography>
              <IconButton
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                aria-label="Página siguiente"
                size="small"
              >
                <NavigateNext />
              </IconButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Menu;
