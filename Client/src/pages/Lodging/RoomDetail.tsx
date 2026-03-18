import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import NotFound from "../NotFound";
import { rooms } from "./rooms";
import RoomCard from "./RoomCard";
import Footer from "../../components/Footer/Footer";
import "./RoomDetail.css";

const RoomDetail = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const room = useMemo(() => rooms.find((r) => r.id === roomId), [roomId]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!room) return;

    const imageUrl = room.images[selectedImageIndex]?.url;
    if (!imageUrl) {
      setIsReady(true);
      return;
    }

    setIsReady(false);
    const img = new Image();
    img.onload = () => setIsReady(true);
    img.onerror = () => setIsReady(true);
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [roomId, room, selectedImageIndex]);

  if (!room) return <NotFound />;

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <Box className="roomDetailRoot">
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="roomDetailHeaderRow"
          >
            <Button variant="text" onClick={() => navigate("/Lodging")}>
              Volver
            </Button>
            <Typography variant="body1" color="text.secondary">
              Desde{" "}
              <Box
                component="span"
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                {room.price}
              </Box>
            </Typography>
          </Stack>
        </Container>

        <Box
          className="roomDetailHero"
          sx={{ height: { xs: 260, sm: 360, md: 520 } }}
        >
          {!isReady && (
            <Box className="roomDetailLoadingOverlay">
              <CircularProgress />
            </Box>
          )}
          <CardMedia
            component="img"
            image={room.images[selectedImageIndex]?.url}
            alt={room.images[selectedImageIndex]?.alt}
            className="roomDetailHeroImage"
          />

          {room.images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                aria-label="Imagen anterior"
                className="roomDetailNavButton roomDetailNavButtonLeft"
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                aria-label="Siguiente imagen"
                className="roomDetailNavButton roomDetailNavButtonRight"
              >
                <ArrowForwardIos />
              </IconButton>

              <Box className="roomDetailDots">
                {room.images.map((_, index) => (
                  <Box
                    key={room.images[index]?.url ?? index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={[
                      "roomDetailDot",
                      index === selectedImageIndex ? "roomDetailDotActive" : "",
                    ].join(" ")}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>

        <Container
          maxWidth="lg"
          className="roomDetailContentWrap"
          sx={{ opacity: isReady ? 1 : 0 }}
        >
          <Stack
            alignItems="center"
            className="roomDetailCenterStack"
            sx={{ px: { xs: 0, md: 6 } }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              className="roomDetailTitle"
            >
              {room.title}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              className="roomDetailChips"
            >
              <Chip
                label={`${room.roomCount} HABITACIONES`}
                variant="outlined"
              />
              <Chip label={`${room.maxCapacity} PERSONAS`} variant="outlined" />
              <Chip label={room.size} variant="outlined" />
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              className="roomDetailDescription"
            >
              {room.description}
            </Typography>

            <Button
              variant="outlined"
              className="roomDetailReserveBtn"
              color="inherit"
            >
              Reserva ahora
            </Button>
          </Stack>
        </Container>
        <Box
          className="d-flex flex-wrap gap-8 roomDetailOtherRooms"
          sx={{ opacity: isReady ? 1 : 0 }}
        >
          {rooms.map(
            (room) =>
              roomId !== room.id && <RoomCard key={room.id} {...room} />,
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default RoomDetail;
