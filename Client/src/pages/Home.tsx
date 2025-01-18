// import { useContextUser } from "../hooks/useContextUser";

import { Box, Typography } from "@mui/material";
import Card from "../components/Cards/Cards";

import QuiltedImageList from "../components/QuiltedImageList/QuiltedImageList";

import YouTubeEmbed from "../components/YouTubeEmbed/YouTubeEmbed";

const Home = () => {
  // const { userInfo } = useContextUser();
  //   <a href="https://api.whatsapp.com/send?phone=573128198146&text=Hola como estas">
  //   click me
  // </a>

  return (
    <>
      <Box
        className="video-background-container"
        sx={{ marginBottom: { xs: 0, md: "200px" } }}
      >
        <YouTubeEmbed />
      </Box>

      <Box
        sx={{
          position: "relative",
          background: "var(--blueLigth)",
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
              color: { xs: "#FFFFFF", md: "var(--blueDarkLigth)" },
              fontSize: 22,
              fontWeight: 600,
              marginBlock: 4,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Servicios incluidos
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
            <Card
              title="Transporte marítimo ida y regreso."
              img="/images/MangataBed.jpg"
            />
            <Card
              title="Copa de champaña de bienvenida o jugo"
              img="/images/MangataCopa.jpg"
            />
            <Card
              title="Restaurante con aire acondicionado o al aire libre"
              img="/images/MangataEat.jpg"
            />
            <Card title="Deportes acuáticos" img="/images/MangataKayak.png" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Typography
          sx={{
            color: "var(--blueDarkLigth)",
            fontSize: 22,
            fontWeight: 600,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Te acompañamos al paraíso
        </Typography>
        <Typography
          sx={{
            color: "var(--blueDarkLigth)",
            fontSize: 18,
            fontWeight: 400,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          con un solo bocado
        </Typography>
        <QuiltedImageList />
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
              fontSize: 20,
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Mangata Beach Club
          </Typography>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: 14,
              marginBottom: 2,
            }}
          >
            Islas del Rosario- Isla Grande sector Zaragoza, Colombia
          </Typography>
        </Box>
        <Box>
          <img width={32} src="/images/instagram.png" />
        </Box>
      </Box>
    </>
  );
};

export default Home;
