import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
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
  Grid,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";

interface RoomImage {
  id: number;
  url: string;
  alt: string;
}

interface RoomCardProps {
  title: string;
  roomCount: number;
  maxCapacity: number;
  size: string;
  description: string;
  price: string;
  images: RoomImage[];
}

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  roomCount,
  maxCapacity,
  size,
  description,
  price,
  images,
}) => {
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
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: 6,
          },
        }}
      >
        {/* Imagen principal */}
        <Box
          sx={{ position: "relative", cursor: "pointer" }}
          onClick={() => handleOpen(0)}
        >
          <CardMedia
            component="img"
            height="200"
            image={images[0]?.url || ""}
            alt={images[0]?.alt || title}
            sx={{
              objectFit: "cover",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          />
          {images.length > 1 && (
            <Chip
              label={`+${images.length - 1} más`}
              size="small"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Título */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            {title}
          </Typography>

          {/* Características principales */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Chip
              label={`${roomCount} HABITACIONES`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Chip
              label={`${maxCapacity} PERSONAS`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Chip
              label={size}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          {/* Descripción */}
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>

          {/* Miniaturas de imágenes adicionales */}
          {images.length > 1 && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                gutterBottom
              >
                Ver más imágenes:
              </Typography>
              <Grid container spacing={1}>
                {images.slice(1, 4).map((image, index) => (
                  <Grid item xs={4} key={image.id}>
                    <CardMedia
                      component="img"
                      image={image.url}
                      alt={image.alt}
                      sx={{
                        height: 60,
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: 1,
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                      onClick={() => handleOpen(index + 1)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", p: 2, pt: 0 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Desde
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {price}
            </Typography>
          </Box>
          <Box>
            {/* <Button 
              variant="outlined" 
              size="small"
              sx={{ mr: 1 }}
            >
              INFO
            </Button> */}
            <Button variant="contained" size="small" color="primary">
              RESERVAR
            </Button>
          </Box>
        </CardActions>
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
              {images.map((_, index) => (
                <Box
                  key={index}
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
