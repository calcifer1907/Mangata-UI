// import { useContextUser } from "../hooks/useContextUser";

import { Box, Typography } from "@mui/material";
import Card from "../components/Cards/Cards";

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
        {/* Video de fondo */}
        <YouTubeEmbed />
        {/* Contenido superpuesto */}
        <div className="content-overlay">
          {/* <h1>Mangata</h1> */}
          {/* <p>Este es un contenido que se muestra sobre el video de fondo.</p> */}
        </div>
      </Box>

      <Box
        sx={{
          position: "relative",
          background: "var(--blueLigth)",
          height: { xs: "auto", md: "auto", lg: "400px" },
          marginBottom: 8,
          paddingBlock: { xs: 2, lg: 0 },
        }}
      >
        <Box
          sx={{
            position: { xs: "inherit", md: "inherit", lg: "absolute" },
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
            <Card title="Deportes acuáticos" img="/images/MangataKayak.png" />
            <Card
              title="Restaurante con aire acondicionado o al aire libre"
              img="/images/MangataEat.jpg"
            />
            <Card
              title="Copa de champaña de bienvenida o jugo"
              img="/images/MangataBed.jpg"
            />
            <Card
              title="Transporte marítimo ida y regreso."
              img="/images/MangataBed.jpg"
            />
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
        <Box
          className="image-grid"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gridColumnGap: "12px",
            gridRowGap: "12px",
          }}
        >
          <div style={{ gridArea: "1 / 1 / 3 / 3" }}>
            <img
              src="/images/MangataEat.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
            <img
              src="/images/MangataEat.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ gridArea: "1 / 4 / 2 / 5" }}>
            <img
              src="/images/MangataEat.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ gridArea: "3 / 1 / 4 / 2" }}>
            <img
              src="/images/MangataEat.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ gridArea: "3 / 2 / 4 / 3" }}>
            <img
              src="/images/MangataEat.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ gridArea: "2 / 3 / 4 / 5" }}>
            <img
              src="/images/MangataEat.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Box>
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
