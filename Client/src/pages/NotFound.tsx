import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          p: 3,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {/* Encabezado 404 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5rem", sm: "6rem" },
            fontWeight: "bold",
            color: theme.palette.mode === "dark" ? "error.light" : "error.dark",
            mb: 2,
            letterSpacing: 2,
          }}
        >
          404
        </Typography>

        <Divider
          sx={{ width: "100px", height: "4px", bgcolor: "error.main", mb: 3 }}
        />

        {/* Mensaje principal */}
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: "medium",
          }}
        >
          Página no encontrada
        </Typography>

        {/* Descripción */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            maxWidth: "600px",
            fontSize: { xs: "1rem", sm: "1.1rem" },
            lineHeight: 1.6,
          }}
        >
          Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
          que la dirección URL sea incorrecta o la página haya sido movida.
        </Typography>

        {/* Botones de acción */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            size="large"
            sx={{
              flex: 1,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Página principal
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            size="large"
            sx={{
              flex: 1,
              py: 1.5,
            }}
          >
            Volver
          </Button>
        </Box>

        {/* Mensaje adicional opcional */}
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            color: "text.secondary",
          }}
        >
          Si crees que esto es un error, por favor contacta al soporte técnico.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
