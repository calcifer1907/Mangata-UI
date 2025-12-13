// import { useContextUser } from "../hooks/useContextUser";

/**Libraries */
import { Box, Typography } from "@mui/material";

/**Component */
import Card from "../components/Cards/Cards";
import YouTubeEmbed from "../components/YouTubeEmbed/YouTubeEmbed";

/** */
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer/Footer";
import InitialSummary from "../components/Initialsummary/InitialSummary";

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
        sx={{
          display: { xs: "none", md: "block", lg: "block" },
        }}
      >
        <YouTubeEmbed />
      </Box>
      <InitialSummary />
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
          <Box className="d-flex align-items-center justify-content-center flex-wrap flex-row gap-50">
            <Card
              title={t("TitleCardDayTrip")}
              img="/images/MangataBeach.webp"
              button
              redirectTo="/#/DayTrip"
            />
            <Card
              title={t("titleCardLoding")}
              img="/images/Hotel.webp"
              button
              redirectTo="/#/Lodging"
            />
            <Card
              title={t("titleCardEvents")}
              img="/images/Events.webp"
              button
              redirectTo="/#/events"
            />
          </Box>
        </Box>
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1700.452588924178!2d-75.74653340145481!3d10.18260159812736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e587d182be4842b%3A0x6b4b5e8abb065bdb!2sMangata!5e0!3m2!1ses!2sco!4v1744051915629!5m2!1ses!2sco"
        width="100%"
        height="550"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <Box
        sx={{
          background: "var(--color-theme-sand-light)",
          color: "var(--color-theme-dark-blue)",
          padding: 3,
          textAlign: "center",
          height: "auto",
          alignContent: "center",
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

      <Footer />
    </>
  );
};

export default Home;
