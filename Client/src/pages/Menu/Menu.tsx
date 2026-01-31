import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import workerUrl from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url";

import "./styleMenu.css";
import Footer from "../../components/Footer/Footer";

import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";

// Configurar el worker de PDF.js usando Vite
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentError, setDocumentError] = useState<string | null>(null);

  const { t } = useTranslation("home");

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
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
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
        <Box>
          <Typography
            component="h1"
            className="title-menu-some-plates"
            sx={{
              fontSize: { xs: "2rem", md: "3.2rem" },
            }}
          >
            Algunos de nuestros platos
          </Typography>
          <Box
            className="d-flex align-items-center justify-content-around flex-wrap gap-8"
            sx={{ flexDirection: { xs: "column-reverse", lg: "row" } }}
          >
            <Box
              component="img"
              src="/images/lunche/FOTOS PLATOS/caribeña_adicional.webp"
              alt="Platos de Mangata"
              sx={{
                width: { xs: "85%", lg: 600 },
                height: { xs: 500, lg: 800 },
              }}
              loading="lazy"
            />
            <Box
              className="d-flex align-items-center justify-content-center flex-direction-column text-align-center content-descrition-plates"
              sx={{ gap: { xs: 1, lg: 5 }, width: { xs: "100%", lg: "50%" } }}
            >
              <Typography component="h1">miscela caraibica</Typography>
              <Typography
                component="p"
                sx={{
                  maxWidth: { xs: "90%", md: "80%", lg: "60%" },
                }}
              >
                {t("miscela")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="d-flex align-items-center justify-content-around flex-wrap gap-8">
            <Box
              className="d-flex align-items-center justify-content-center flex-direction-column text-align-center content-descrition-plates"
              sx={{ gap: { xs: 1, lg: 5 }, width: { xs: "100%", lg: "50%" } }}
            >
              <Typography component="h1">fra amici</Typography>
              <Typography
                component="p"
                sx={{
                  maxWidth: { xs: "90%", md: "80%", lg: "60%" },
                }}
              >
                {t("fraAmici")}
              </Typography>
            </Box>
            <Box
              component="img"
              src="/images/lunche/FOTOS PLATOS/fra_amici_adicional.webp"
              alt="Platos de Mangata"
              sx={{
                width: { xs: "85%", lg: 600 },
                height: { xs: 400, lg: 700 },
              }}
              loading="lazy"
            />
          </Box>
        </Box>
      </Box>

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
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6">{t("menu")}</Typography>
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
          }}
        >
          <Document
            file="/CartaMangata.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<Loading />}
            error={
              <Box sx={{ padding: "2rem", textAlign: "center" }}>
                <Typography sx={{ color: "error.main", marginBottom: "1rem" }}>
                  {t("errorPDF")}
                </Typography>
                {documentError && (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginBottom: "0.5rem" }}
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
            <Box sx={{ marginBottom: "1rem" }}>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <IconButton
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                aria-label="Página anterior"
              >
                <NavigateBefore />
              </IconButton>
              <Typography sx={{ color: "text.secondary" }}>
                {t("page")} {pageNumber} {t("of")} {numPages}
              </Typography>
              <IconButton
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                aria-label="Página siguiente"
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
