import {
  Box,
  Typography,
  Button,
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
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import workerUrl from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url";

import "./styleMenu.css";
import Footer from "../../components/Footer/Footer";

import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading/Loading";

// Configurar el worker de PDF.js usando Vite
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const Menu = () => {
  const { t } = useTranslation("home");
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentError, setDocumentError] = useState<string | null>(null);


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

  function onDocumentLoadError(error: any) {
    console.error("Error al cargar el PDF:", error);
    setDocumentError(error?.message || String(error));
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
      <Box className="container-menu">
        <Box
          sx={{
            maxWidth: { xs: "90%", md: "80%", lg: "50%" },
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
              {t("titleMenu1")}
            </Typography>
            <Typography component="h1" className="title-day-trip">
              {t("titleMenu2")}
            </Typography>
          </Box>
          <Typography component="p" className="descriotion-day-trip">
            Disfruta un pasadía completo en Mangata: playa, gastronomía,
            cocteles y actividades en las Islas del Rosario.
          </Typography>

          <Button
            className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={handleOpen}
          >
            Ver Menú
          </Button>
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
          <Typography variant="h6">Carta Mangata</Typography>
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
                  Error al cargar el PDF. Por favor, intente nuevamente.
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
                  Asegúrese de que el archivo existe en la carpeta public y que
                  el worker de PDF.js está configurado.
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
                Página {pageNumber} de {numPages}
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
