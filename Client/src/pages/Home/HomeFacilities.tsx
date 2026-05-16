import type { CSSProperties } from "react";
import { Box, Typography } from "@mui/material";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import "./HomeFacilities.css";

const FACILITIES: {
  key: string;
  Icon: SvgIconComponent;
  accent: string;
}[] = [
  { key: "SunbathingChairs", Icon: DeckOutlinedIcon, accent: "#6490c7" },
  { key: "Hammocks", Icon: BeachAccessOutlinedIcon, accent: "#b99734" },
  { key: "BalineseBeds", Icon: KingBedOutlinedIcon, accent: "#4672a5" },
  { key: "Freshwater", Icon: ShowerOutlinedIcon, accent: "#5a8fc4" },
  { key: "towelService", Icon: DryCleaningOutlinedIcon, accent: "#2b3d5e" },
];

const HomeFacilities = () => {
  const { t } = useTranslation("home");

  return (
    <Box
      component="section"
      className="home-facilities-section"
      aria-labelledby="facilities-heading"
    >
      <Box className="home-facilities-bg" aria-hidden />

      <Box className="home-facilities-inner">
        <Box className="home-facilities-header">
          <Typography className="home-facilities-overline">
            {t("homeFacilitiesOverline")}
          </Typography>
          <Typography
            component="h2"
            id="facilities-heading"
            className="home-facilities-title"
          >
            {t("useOfFacilities")}
          </Typography>
          <Box className="home-facilities-title-accent" aria-hidden />
          <Typography className="home-facilities-lead">
            {t("homeFacilitiesLead")}
          </Typography>
        </Box>

        <Box className="home-facilities-panel">
          <Box className="home-facilities-visual">
            <Box className="home-facilities-frame" aria-hidden />
            <Box className="home-facilities-frame home-facilities-frame--front">
              <Box
                component="img"
                src="/images/IMG_5002.webp"
                alt={t("useOfFacilities")}
                className="home-facilities-photo"
              />
              <Box className="home-facilities-photo-overlay" aria-hidden />
              <Typography className="home-facilities-photo-caption">
                {t("homeFacilitiesCaption")}
              </Typography>
            </Box>
          </Box>

          <Box className="home-facilities-content">
            <Typography className="home-facilities-intro">
              {t("inOurClub")}
            </Typography>

            <Box className="home-facilities-grid" role="list">
              {FACILITIES.map(({ key, Icon, accent }, index) => (
                <Box
                  key={key}
                  className="home-facility-card"
                  role="listitem"
                  style={{ "--facility-accent": accent } as CSSProperties}
                >
                  <Box className="home-facility-card-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </Box>
                  <Box className="home-facility-card-icon-wrap">
                    <Icon className="home-facility-card-icon" />
                  </Box>
                  <Typography className="home-facility-card-label">
                    {t(key)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeFacilities;
