import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardMedia,
  Stack,
  Fade,
  Slide,
  Zoom,
  Grow,
  ButtonGroup,
  Button,
} from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  PlayArrow,
  Pause,
  FiberManualRecord,
} from "@mui/icons-material";

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  height?: number | string;
  width?: number | string;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showThumbnails?: boolean;
  transition?: "fade" | "slide" | "zoom" | "grow";
  transitionDuration?: number;
  variant?: "full" | "compact" | "card";
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = 500,
  width = "100%",
  autoPlay = true,
  autoPlaySpeed = 5000,
  showControls = true,
  showIndicators = true,
  showThumbnails = false,
  transition = "fade",
  transitionDuration = 500,
  variant = "full",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // AutoPlay
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(goToNext, autoPlaySpeed);
    return () => clearInterval(interval);
  }, [isPlaying, autoPlaySpeed]);

  const renderTransition = (children: React.ReactElement) => {
    const commonProps = {
      in: true,
      timeout: transitionDuration,
      mountOnEnter: true,
      unmountOnExit: true,
    };

    switch (transition) {
      case "slide":
        return (
          <Slide direction={direction} {...commonProps}>
            {children}
          </Slide>
        );
      case "zoom":
        return <Zoom {...commonProps}>{children}</Zoom>;
      case "grow":
        return <Grow {...commonProps}>{children}</Grow>;
      case "fade":
      default:
        return <Fade {...commonProps}>{children}</Fade>;
    }
  };

  return (
    <Box sx={{ width, position: "relative", overflow: "hidden" }}>
      {/* Contenedor principal */}
      <Box sx={{ height, position: "relative" }}>
        {renderTransition(
          <Card sx={{ height: "100%", width: "100%", position: "absolute" }}>
            <CardMedia
              component="img"
              image={images[currentIndex].src}
              alt={images[currentIndex].alt}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: variant === "card" ? "contain" : "cover",
              }}
            />

            {/* Overlay de información */}
            {(images[currentIndex].title ||
              images[currentIndex].description) && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "white",
                  p: 3,
                }}
              >
                {images[currentIndex].title && (
                  <Typography variant="h5" gutterBottom>
                    {images[currentIndex].title}
                  </Typography>
                )}
                {images[currentIndex].description && (
                  <Typography variant="body1">
                    {images[currentIndex].description}
                  </Typography>
                )}
              </Box>
            )}
          </Card>
        )}

        {/* Controles de reproducción */}
        {showControls && (
          <>
            <IconButton
              onClick={goToPrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 16,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <NavigateBefore />
            </IconButton>

            <IconButton
              onClick={goToNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 16,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <NavigateNext />
            </IconButton>

            {/* Control de play/pause */}
            <ButtonGroup
              variant="contained"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                bgcolor: "rgba(0,0,0,0.5)",
              }}
            >
              <IconButton
                onClick={() => setIsPlaying(!isPlaying)}
                sx={{ color: "white" }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </ButtonGroup>
          </>
        )}
      </Box>

      {/* Indicadores */}
      {showIndicators && images.length > 1 && (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ py: 2 }}
        >
          {images.map((_, index) => (
            <IconButton
              key={index}
              size="small"
              onClick={() => goToSlide(index)}
              sx={{ p: 0.5 }}
            >
              <FiberManualRecord
                sx={{
                  fontSize: 12,
                  color: index === currentIndex ? "primary.main" : "grey.400",
                }}
              />
            </IconButton>
          ))}
        </Stack>
      )}

      {/* Miniaturas */}
      {showThumbnails && images.length > 1 && (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 2, overflowX: "auto", pb: 1 }}
        >
          {images.map((image, index) => (
            <Box
              key={image.id}
              onClick={() => goToSlide(index)}
              sx={{
                cursor: "pointer",
                opacity: index === currentIndex ? 1 : 0.6,
                border:
                  index === currentIndex
                    ? "3px solid primary.main"
                    : "3px solid transparent",
                borderRadius: 1,
                overflow: "hidden",
                flexShrink: 0,
                transition: "all 0.3s",
              }}
            >
              <CardMedia
                component="img"
                image={image.src}
                alt={image.alt}
                sx={{
                  width: 100,
                  height: 75,
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Stack>
      )}

      {/* Contador */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "white",
          px: 1,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        {currentIndex + 1} / {images.length}
      </Typography>
    </Box>
  );
};

export default ImageCarousel;
