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
              color: { xs: "#FFFFFF", md: "var(--color-theme-dark-blue)" },
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
              img="/images/MangataBoat.jpeg"
            />
            <Card
              title="Copa de champaña de bienvenida o jugo"
              img="/images/MangataCopa.jpg"
            />
            <Card
              title="Restaurante con aire acondicionado o al aire libre"
              img="/images/MangataEat.jpg"
            />
            <Card
              title="Deportes acuáticos: Snorkelling, Kayak, Paddle Board"
              img="/images/MangataKayak.png"
            />
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
          sx={{
            color: "var(--color-theme-dark-blue)",
            fontSize: 22,
            fontWeight: 600,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Almuerzo a la carta
        </Typography>
        <Typography
          sx={{
            color: "var(--color-theme-dark-blue)",
            fontSize: 18,
            fontWeight: 400,
            marginBlock: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Disfruta de tu almuerzo cerca al mar{" "}
          <b>con 8 opciones de platos disponibles:</b>
        </Typography>
        <QuiltedImageList />
      </Box>
      <Box>
        <Typography
          component="h2"
          sx={{
            color: "var(--color-theme-dark-blue)",
            fontWeight: 600,
            marginBlock: 2,
            fontSize: 22,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Uso de instalaciones
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
              En nuestro club podrás disfrutar de instalaciones amplias y
              cómodas, tiempo de descanso y experiencias inigualables. Tendrás
              acceso a:{" "}
            </Typography>

            <Box
              sx={{
                color: "var(--color-theme-dark-blue)",
                paddingInlineStart: 4,
              }}
            >
              <ul>
                <li>Sillas asoleadoras</li>
                <li>Hamacas</li>
                <li>Camas balinesas</li>
                <li>Ducha de agua dulce</li>
                <li>Servicio de toalla</li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          background: "var(--color-theme-sand-light)",
          color: "var(--color-theme-dark-blue)",
          padding: 4,
          textAlign: "center",
          height: "auto",
          alignContent: "center",
          marginTop: 8,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            paddingBottom: 2,
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          Hora de llegada al muelle: 7:30 a.m.
        </Typography>
        <Typography
          sx={{ fontWeight: 600, fontSize: { xs: "1.2rem", md: "1.5rem" } }}
        >
          Hora de regreso al muelle: aproximadamente 4:00 p.m.
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
          No Incluye
        </Typography>
        <Typography>
          Actividades adicionales no mencionadas anteriormente
        </Typography>
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
            Islas del Rosario- Isla Grande sector Zaragoza, Colombia
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
          href="https://www.instagram.com/mangatabeachclub/"
          target="_blank"
        >
          <img width={32} src="/images/instagram.png" />
        </Box>
      </Box>
    </>
  );
};

export default Home;
