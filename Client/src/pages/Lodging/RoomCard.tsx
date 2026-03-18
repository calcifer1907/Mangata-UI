import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";

import "./RoomCard.css";

interface RoomCardProps {
  id: string;
  title: string;
  maxCapacity: number;
  size: string;
  price: string;
  images: { id: number; url: string; alt: string }[];
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  title,
  maxCapacity,
  size,
  price,
  images,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = (index: number = 0) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <>
      <Card
        className="roomCard"
        onClick={() => navigate(`/Lodging/rooms/${id}`)}
        sx={{
          height: { xs: 420, md: 520 },
        }}
      >
        {/* Imagen principal con overlay de información */}
        <Box
          className="roomCardMediaWrap"
          sx={{ height: "calc(100% - 56px)" }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen(0);
          }}
        >
          <CardMedia
            component="img"
            image={images[0]?.url || ""}
            alt={images[0]?.alt || title}
            className="roomCardMedia"
          />

          {/* Capa oscura inferior para destacar el texto */}
          <Box className="roomCardGradient" />

          {/* Contenido principal: nombre y precio */}
          <Box
            className="roomCardOverlayContent"
            sx={{
              left: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              bottom: { xs: 16, md: 72 },
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              className="roomCardTitle"
            >
              {title}
            </Typography>

            <Typography
              variant="subtitle2"
              className="roomCardSubtitle"
            >
              Desde <span className="roomCardSubtitlePrice">{price}</span>
            </Typography>

            {/* Capacidad y tamaño, sin mostrar número de habitaciones */}
            <Box
              className="roomCardMetaRow"
            >
              <Box className="roomCardMetaItem">
                <Typography variant="body2">{maxCapacity}</Typography>
                <Typography variant="body2">personas</Typography>
              </Box>

              <Box className="roomCardMetaItem">
                <Typography variant="body2">{size}</Typography>
              </Box>
            </Box>
          </Box>

          {images.length > 1 && (
            <Chip
              label={`+${images.length - 1} más`}
              size="small"
              className="roomCardMoreChip"
            />
          )}
        </Box>

        {/* Botón de detalle fijo al fondo para mantener mismo alto */}
        <Box className="roomCardFooter">
          <Button
            variant="outlined"
            size="small"
            className="roomCardDetailButton"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/Lodging/rooms/${id}`);
            }}
          >
            Ver detalle
          </Button>
        </Box>
      </Card>

      {/* Dialog para vista previa de imágenes */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6">{title} - Galería</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ position: "relative", p: 0 }}>
          {/* Imagen principal en el dialog */}
          <Box
            sx={{ position: "relative", height: fullScreen ? "60vh" : "70vh" }}
          >
            <CardMedia
              component="img"
              image={images[selectedImageIndex]?.url}
              alt={images[selectedImageIndex]?.alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

            {/* Controles de navegación */}
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <ArrowBackIos />
                </IconButton>

                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </>
            )}

            {/* Indicador de imagen */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "4px 8px",
                borderRadius: 2,
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={image.id}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor:
                      index === selectedImageIndex
                        ? "primary.main"
                        : "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </Box>
          </Box>

          {/* Miniaturas en el dialog */}
          {images.length > 1 && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                p: 2,
                overflowX: "auto",
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              {images.map((image, index) => (
                <CardMedia
                  key={image.id}
                  component="img"
                  image={image.url}
                  alt={image.alt}
                  sx={{
                    width: 80,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    opacity: index === selectedImageIndex ? 1 : 0.6,
                    border: index === selectedImageIndex ? 2 : 0,
                    borderColor: "primary.main",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </Box>
          )}

          {/* Información de la imagen actual */}
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {images[selectedImageIndex]?.alt ||
                `Imagen ${selectedImageIndex + 1} de ${images.length}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {selectedImageIndex + 1} / {images.length}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoomCard;
