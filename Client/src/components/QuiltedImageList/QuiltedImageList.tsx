import React, { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  Modal,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";

import "./QuiltedImageList.scss";

// Interfaz para el tipo de imagen
interface ImageItem {
  id: number | string;
  img: string;
  description: string;
  titleEN?: string;
  cols?: number;
  rows?: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
}

const ImageGalleryWithLightbox: React.FC<ImageGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem>(images[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleOpen = (index: number): void => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleNext = (): void => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handlePrev = (): void => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Manejar teclas de navegación
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) {
        return;
      }

      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex]);

  return (
    <>
      <ImageList
        variant="quilted"
        cols={4}
        gap={8}
        className="container-quilted wd-100"
      >
        {images.map((item, index) => (
          <ImageListItem
            key={item.id}
            cols={item.cols}
            rows={item.rows}
            className="ImageListItem"
            onClick={() => handleOpen(index)}
          >
            <img
              src={`${item.img}?w=248&h=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.description}
              loading="lazy"
              className="wd-100 hg-100 transition-image"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        open={open}
        onClose={handleClose}
        className="d-flex align-items-center justify-content-center"
      >
        <Box className="container-buttons">
          {/* Botón cerrar */}
          <IconButton
            onClick={handleClose}
            className="p-absolute icon-button-grid"
            sx={{
              top: { xs: -40, sm: -50 },
              right: { xs: 0, sm: -50 },
            }}
            aria-label="Cerrar"
          >
            <CloseIcon />
          </IconButton>

          {/* Botón anterior */}
          <IconButton
            onClick={handlePrev}
            className="p-absolute icon-button-grid icon-button-back"
            sx={{
              left: { xs: 0, sm: -60 },
              display: { xs: images.length > 1 ? "flex" : "none", sm: "flex" },
            }}
            aria-label="Imagen anterior"
          >
            <PrevIcon />
          </IconButton>

          {/* Botón siguiente */}
          <IconButton
            onClick={handleNext}
            className="p-absolute icon-button-grid icon-button-back"
            sx={{
              right: { xs: 0, sm: -60 },
              display: { xs: images.length > 1 ? "flex" : "none", sm: "flex" },
            }}
            aria-label="Imagen siguiente"
          >
            <NextIcon />
          </IconButton>

          {/* Contenedor de la imagen */}
          <Box
            className="d-flex flex-direction-column align-items-center justify-content-center"
            sx={{
              maxWidth: "80vw",
              maxHeight: "80vh",
            }}
          >
            <img
              src={selectedImage?.img}
              alt={selectedImage?.description}
              className="img-grid"
            />

            {/* Información de la imagen */}
            {selectedImage && (
              <Box className="information-image">
                <Typography variant="h6" gutterBottom>
                  {selectedImage.description}
                </Typography>
                {selectedImage.description && (
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {selectedImage.titleEN ? `(${selectedImage.titleEN})` : ""}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 1, opacity: 0.7 }}
                >
                  {currentIndex + 1} / {images.length}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ImageGalleryWithLightbox;
