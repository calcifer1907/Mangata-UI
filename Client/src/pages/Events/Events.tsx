import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import "./styleEvents.css";
import Footer from "../../components/Footer/Footer";

const Events = () => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes integrar tu lógica para enviar los datos (API, email, etc.)
    console.log("Datos enviados:", formValues);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="content-event" component="section">
        <Box className="container-event">
          {/* Sección del título y descripción */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 15%" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: { xs: "center", md: "center" },
              px: { xs: 2, sm: 3, md: 4 },
              marginTop: { xs: "2rem", md: 0 },
            }}
          >
            <Typography
              component="h1"
              className="title-event"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                marginBottom: { xs: "1rem", md: "1.5rem" },
                width: "100%",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Celebra en el paraíso
            </Typography>
            <Typography
              component="p"
              className="description-event"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.25rem",
                },
                width: "100%",
                textAlign: { xs: "center", md: "left" },
                maxWidth: { xs: "100%", md: "500px" },
              }}
            >
              Bodas, cumpleaños, despedidas de solter@s y eventos privados en un
              escenario caribeño único. Creamos experiencias a tu medida.
            </Typography>
          </Box>

          {/* Sección del formulario */}
          <Box
            className="form-container"
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 55%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5, lg: 6 },
                borderRadius: "16px",
                backgroundColor: "#f1ece6",
                width: "100%",
                maxWidth: { xs: "100%", md: "700px", lg: "800px" },
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: { xs: 1, md: 2 } }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: { xs: 2.5, sm: 3.5, md: 4 },
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    label="Nombre"
                    name="nombre"
                    value={formValues.nombre}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#2B3D5E",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2B3D5E",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    required
                    label="Teléfono"
                    name="telefono"
                    value={formValues.telefono}
                    onChange={handleChange}
                    inputMode="tel"
                    sx={{
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#2B3D5E",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2B3D5E",
                        },
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mt: { xs: 3, sm: 4, md: 4.5 },
                    display: "grid",
                    gap: { xs: 2.5, sm: 3.5, md: 4 },
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    label="Correo electrónico"
                    name="correo"
                    type="email"
                    value={formValues.correo}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#2B3D5E",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2B3D5E",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    label="Mensaje"
                    name="mensaje"
                    value={formValues.mensaje}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#2B3D5E",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2B3D5E",
                        },
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mt: { xs: 4, sm: 5, md: 5.5 },
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      backgroundColor: "var(--color-theme-midnight-black)",
                      color: "#fff",
                      paddingInline: { xs: "1.5rem", sm: "2rem" },
                      paddingBlock: { xs: "0.875rem", sm: "0.75rem" },
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      borderRadius: "0.5rem",
                      textTransform: "none",
                      fontWeight: 600,
                      maxWidth: { xs: "100%", sm: "300px" },
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Enviar solicitud
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Events;
