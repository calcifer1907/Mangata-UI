import { Box, Typography } from "@mui/material";

interface IProsp {
  title: string;
  img: string;
  button?: boolean;
  redirectTo?: string;
  buttonTitle?: string;
}

import "./styleCards.css";

const Cards = ({ title, img, button, redirectTo, buttonTitle }: IProsp) => {
  return (
    <Box className="container-cards">
      <Box component="img" src={img} className="wd-100 image-card" />
      <Box className="content-card">
        <Box className="hg-100 d-flex justify-content-evenly align-items-center flex-direction-column">
          <Typography className="font-weight-600 font-size-16 title-card">
            {title}
          </Typography>
          {button && (
            <Typography
              component="a"
              href={redirectTo}
              className="buttonDiscover"
            >
              {buttonTitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
