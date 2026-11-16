import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

import wifiIcon from "../../assets/Icons/Wifi.svg";
import bedIcon from "../../assets/Icons/Bed.svg";
import towelIcon from "../../assets/Icons/Towel.svg";

const RoomDetail = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const room = useMemo(() => rooms.find((r) => r.id === roomId), [roomId]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  const imageUrl = room?.images[selectedImageIndex]?.url;
  const isReady = !imageUrl || loadedImageUrl === imageUrl;

  useEffect(() => {
    if (!imageUrl) return;

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoadedImageUrl(imageUrl);
    };
    img.onerror = () => {
      if (!cancelled) setLoadedImageUrl(imageUrl);
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

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
              {t("roomDetailBack")}
            </Button>
            <Typography variant="body1" color="text.secondary">
              {t("roomDetailFrom")}{" "}
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
                aria-label={t("roomDetailPrevImage")}
                className="roomDetailNavButton roomDetailNavButtonLeft"
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                aria-label={t("roomDetailNextImage")}
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
              {t("roomDetailCabinTitle", { id: room.id })}
            </Typography>

            <Stack direction="row" spacing={1} className="roomDetailChips">
              <Chip
                label={`${room.roomCount} ${
                  room.roomCount === 1
                    ? t("roomDetailRoomSingular")
                    : t("roomDetailRoomPlural")
                }`}
                variant="outlined"
              />
              <Chip
                label={`${room.maxCapacity} ${
                  room.maxCapacity === 1
                    ? t("roomDetailPersonSingular")
                    : t("roomDetailPersonPlural")
                }`}
                variant="outlined"
              />
              <Chip label={room.size} variant="outlined" />
            </Stack>

            <Box
              className="roomDetailAmenities"
              aria-label={t("roomDetailAmenities")}
            >
              <Box className="roomDetailAmenity">
                <img
                  src={wifiIcon}
                  alt={t("roomDetailWifi")}
                  className="roomDetailAmenityIcon"
                />
                <Typography variant="body2">{t("roomDetailWifi")}</Typography>
              </Box>
              <Box className="roomDetailAmenity">
                <img
                  src={towelIcon}
                  alt={t("roomDetailShower")}
                  className="roomDetailAmenityIcon"
                />
                <Typography variant="body2">{t("roomDetailShower")}</Typography>
              </Box>
              <Box className="roomDetailAmenity">
                <img
                  src={bedIcon}
                  alt={t("roomDetailBed")}
                  className="roomDetailAmenityIcon"
                />
                <Typography variant="body2">{t("roomDetailBed")}</Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              className="roomDetailDescription"
            >
              {t("roomDetailDescription")}
            </Typography>

            <Button
              variant="outlined"
              className="roomDetailReserveBtn"
              color="inherit"
              href="https://engine.ayenda.co/mangata-beach"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("roomDetailBookNow")}
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
