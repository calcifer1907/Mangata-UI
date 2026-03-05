import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

interface IProsp {
  title: string;
  img: string;
  button?: boolean;
  redirectTo?: string;
  buttonTitle?: string;
}

import "./styleCards.css";

const Cards = ({ title, img, button, redirectTo, buttonTitle }: IProsp) => {
  const { t } = useTranslation("home");
  return (
    <Box className="container-cards">
      <Box component="img" src={img} className="wd-100 image-card" />
      <Box className="content-card">
        <Box className="hg-100 d-flex justify-content-evenly align-items-center flex-direction-column">
          <Typography className="font-weight-600 font-size-20 title-card">
            {title}
          </Typography>
          {button && (
            <Button
              variant="contained"
              component={NavLink}
              to={redirectTo ? redirectTo : "/"}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {buttonTitle ? buttonTitle : t("discover")}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
