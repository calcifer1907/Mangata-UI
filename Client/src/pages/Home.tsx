// import { useContextUser } from "../hooks/useContextUser";

/**Libraries */
import { Box, Typography } from "@mui/material";

/**Component */
import Card from "../components/Cards/Cards";
import QuiltedImageList from "../components/QuiltedImageList/QuiltedImageList";
import YouTubeEmbed from "../components/YouTubeEmbed/YouTubeEmbed";

/** */
import { useTranslation } from "react-i18next";

const Home = () => {
  // const { userInfo } = useContextUser();
  //   <a href="https://api.whatsapp.com/send?phone=573128198146&text=Hola como estas">
  //   click me
  // </a>
  const { t } = useTranslation("home");
  return (
    <>
      <Box
        className="video-background-container"
        sx={{ marginBottom: { xs: 0, md: "200px" } }}
      >
        <YouTubeEmbed />
      </Box>
      <Box
        className="background-ligth-blue"
        sx={{
          position: "relative",
          height: { xs: "auto", xl: "400px" },
          marginBottom: 8,
          paddingBlock: { xs: 2, xl: 0 },
        }}
      >
        <Box
          sx={{
            position: { xs: "inherit", xl: "absolute" },
            top: { xs: 0, lg: "-200px" },
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            sx={{
              color: { xs: "#FFFFFF", md: "var(--color-theme-dark-blue)" },
              fontSize: 22,
              fontWeight: 600,
              marginBlock: 4,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {t("servicesIncluded")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "50px",
            }}
          >
            <Card title={t("roundTrip")} img="/images/MangataBoat.webp" />
            <Card title={t("welcomeGlass")} img="/images/MangataCopa.webp" />
            <Card title={t("airConditioned")} img="/images/MangataEat.webp" />
            <Card title={t("waterSports")} img="/images/MangataKayak.webp" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: { xs: "96%", md: "65%" },
          margin: "0 auto",
          marginBottom: 8,
        }}
      >
        <Typography
          className="color-blue-dark"
          sx={{
            fontSize: 22,
            fontWeight: 600,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("lunchCarte")}
        </Typography>
        <Typography
          className="color-blue-dark"
          sx={{
            fontSize: 18,
            fontWeight: 400,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("enjoyYourLunch")} <b>{t("with8")}:</b>
        </Typography>
        <QuiltedImageList />
      </Box>
      <Box>
        <Typography
          component="h2"
          className="color-blue-dark"
          sx={{
            fontWeight: 600,
            marginBlock: 2,
            fontSize: 22,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("useOfFacilities")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBlock: 6,
            minHeight: 400,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Box
              component="img"
              src="/images/MangataPlaces.jpg"
              sx={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              alignContent: "center",
              padding: 3,
            }}
          >
            <Typography
              sx={{
                color: "var(--color-theme-dark-blue)",
                fontWeight: "normal",
                marginBlock: 2,
              }}
            >
              {t("inOurClub")}{" "}
            </Typography>
            <Box
              sx={{
                color: "var(--color-theme-dark-blue)",
                paddingInlineStart: 4,
              }}
            >
              <ul>
                <li>{t("SunbathingChairs")}</li>
                <li>{t("Hammocks")} </li>
                <li>{t("BalineseBeds")} </li>
                <li>{t("Freshwater")} </li>
                <li>{t("towelService")} </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.061749353047!2d-75.75613558870346!3d10.175636389896914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef62f072ea90277%3A0x9552edd740da742!2sIslas%20del%20Rosario%20Cartagena%20Colombia!5e0!3m2!1ses!2sco!4v1743615890002!5m2!1ses!2sco"
        width="100%"
        height="550"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <Box
        sx={{
          background: "var(--color-theme-sand-light)",
          color: "var(--color-theme-dark-blue)",
          padding: 4,
          textAlign: "center",
          height: "auto",
          alignContent: "center",
          marginBlock: 8,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            paddingBottom: 2,
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          {t("arrivalTime")}: 7:30 a.m.
        </Typography>
        <Typography
          sx={{ fontWeight: 600, fontSize: { xs: "1.2rem", md: "1.5rem" } }}
        >
          {t("dockReturn")} 4:00 p.m.
        </Typography>
      </Box>
      <Box
        sx={{
          color: "var(--color-theme-dark-blue)",
          padding: 4,
          textAlign: "center",
          height: "150px",
          alignContent: "center",
          marginTop: 8,
        }}
      >
        <Typography
          style={{ fontWeight: 600, paddingBottom: 14, fontSize: "1.5rem" }}
        >
          {t("noInclude")}
        </Typography>
        <Typography>{t("additionalActivities")}</Typography>
      </Box>

      <Box
        component="footer"
        sx={{
          height: "auto",
          background: "#cfb57d",
          marginTop: 10,
          textAlign: "center",
          padding: 2,
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
            CopyRigth © {new Date().getFullYear()} Mangata Beach Club
          </Typography>
        </Box>
        <Box
          component="a"
          href="https://www.instagram.com/mangatacartagena/"
          target="_blank"
        >
          <img width={32} src="/images/instagram.png" />
        </Box>
      </Box>
    </>
  );
};

export default Home;
