import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("home");
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        background: "linear-gradient(135deg,#2c3e50,#4a6491)",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontSize: 14,
            marginBottom: 2,
          }}
        >
          {t("IslandsSector")} Zaragoza, Colombia
        </Typography>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontSize: 14,
            marginBottom: 2,
          }}
        >
          mangatabypietro2021@gmail.com <br />
          +57 312 6056467
        </Typography>
      </Box>
      <Box
        component="a"
        href="https://www.instagram.com/mangatacartagena/"
        target="_blank"
      >
        <img width={32} src="/images/instagram.png" />
      </Box>
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: 14,
          marginTop: 2,
        }}
      >
        CopyRigth © {new Date().getFullYear()} Mangata Beach Club
      </Typography>
    </Box>
  );
};

export default Footer;
