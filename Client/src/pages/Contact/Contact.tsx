import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import "./styleContact.css";
import Footer from "../../components/Footer/Footer";

/**Apis */
import { sendContactofrom } from "../../utils/api/agent";

/**Libreries */
import { useTranslation } from "react-i18next";

/**Methods */
import { sanitizeEmail, sanitizeInput } from "../../constant/SanatizedInputs";
import { enqueueSnackbar } from "notistack";

interface IFromContact {
  name: string;
  telephone: string;
  email: string;
  message: string;
}

const INITAL_FORM_VALUES: IFromContact = {
  name: "",
  telephone: "",
  email: "",
  message: "",
};

const Contact = () => {
  const { t } = useTranslation("home");
  const [formValues, setFormValues] =
    useState<IFromContact>(INITAL_FORM_VALUES);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const sanitizedValue = name === "email" ? value : sanitizeInput(value);
    setFormValues((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formValues.email = sanitizeEmail(formValues.email);
    if (
      !formValues.email ||
      formValues.name === "" ||
      formValues.message === "" ||
      formValues.telephone === ""
    ) {
      enqueueSnackbar(t("errorEmail"), {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      await sendContactofrom(formValues)
        .then((response) => {
          if (response.status === "success") {
            setFormValues(INITAL_FORM_VALUES);
            enqueueSnackbar(t("responseSendEmail"), {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
          enqueueSnackbar(t("responseSendEmailError"), {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="content-event" component="section">
        <Box className="container-event">
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
              Estamos aquí para
            </Typography>
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
              ayudarte
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
              Contáctanos para reservas, eventos privados o información general.
              Nuestro equipo te responderá pronto.
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
                    name="name"
                    value={formValues.name}
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
                    name="telephone"
                    value={formValues.telephone}
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
                    name="email"
                    type="email"
                    value={formValues.email}
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
                    name="message"
                    value={formValues.message}
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

export default Contact;
