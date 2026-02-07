import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import "./styleBanner.css";

interface IProps {
  title: string;
  titleTwo?: string;
  description: string;
  linkButton?: string;
  titleButton?: string;
  onClick?: () => void;
}

const STYLES = {
  CONTAINER: {
    maxWidth: { xs: "90%", md: "80%", lg: "50%" },
    margin: { xs: "2rem", md: "3rem" },
  },
  TITLE: { fontSize: { xs: "2.5rem", md: "3.2rem" } },
};

const Banner = ({
  title,
  titleTwo = "",
  description,
  linkButton,
  titleButton,
  onClick = () => {},
}: IProps) => {
  const { t } = useTranslation("home");
  return (
    <Box className={`container-day-banner banner-view-${linkButton}`}>
      <Box sx={STYLES.CONTAINER}>
        <Box>
          <Typography
            component="h1"
            className="title-day-banner"
            sx={STYLES.TITLE}
          >
            {t(title)}
          </Typography>
          {titleTwo && (
            <Typography
              component="h1"
              className="title-day-banner"
              sx={STYLES.TITLE}
            >
              {t(titleTwo)}
            </Typography>
          )}
        </Box>
        {description && (
          <Typography component="p" className="descriotion-day-banner">
            {t(description)}
          </Typography>
        )}
        {linkButton && (
          <Button
            className="button-reservation transition-all duration-200 hover:scale-105 active:scale-95"
            to={`/${linkButton}`}
            component={NavLink}
            onClick={onClick}
          >
            {t(titleButton || t("reserve"))}
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default Banner;
