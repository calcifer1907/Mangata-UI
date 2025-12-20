import React from "react";
import {
  Container,
  Typography,
  Grid,
  ListItemIcon,
  ListItemText,
  Box,
  Paper,
  Button,
  Chip,
  useTheme,
  alpha,
  Avatar,
} from "@mui/material";
import {
  Celebration as CelebrationIcon,
  BeachAccess as BeachIcon,
  Cake as CakeIcon,
  Groups as GroupsIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  AddCircle as AddIcon,
  NavigateNext as NavigateNextIcon,
  Palette as PaletteIcon,
  EventAvailable as EventIcon,
  Water as WaterIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router";

const Events = () => {
  const theme = useTheme();

  const eventTypes = [
    {
      title: "Bodas en la playa",
      description:
        "Ceremonias íntimas y mágicas junto al mar, con la brisa caribeña y el sonido de las olas de fondo.",
      icon: <BeachIcon />,
      color: "#4A90E2", // Azul playa
      tags: ["Romántico", "Íntimo", "Natural"],
      featured: true,
    },
    {
      title: "Cumpleaños & celebraciones",
      description:
        "Desde cenas privadas hasta fiestas frente al mar. Ambientes únicos para días inolvidables.",
      icon: <CakeIcon />,
      color: "#3498DB", // Coral
      tags: ["Familiar", "Divertido", "Personalizado"],
      featured: true,
    },
    {
      title: "Despedidas",
      description:
        "Un plan perfecto con playa, música, coctelería y actividades para celebrar con amigos.",
      icon: <CelebrationIcon />,
      color: "#4A90E2", // Púrpura
      tags: ["Fiesta", "Coctelería", "Actividades"],
    },
    {
      title: "Eventos privados",
      description:
        "Cenas, reuniones familiares, aniversarios o espacios exclusivos para tu grupo.",
      icon: <GroupsIcon />,
      color: "#4A90E2", // Verde
      tags: ["Exclusivo", "Privado", "Familiar"],
    },
    {
      title: "Eventos corporativos",
      description:
        "Reuniones, integración o premiaciones en un entorno que inspira creatividad.",
      icon: <BusinessIcon />,
      color: "#3498DB", // Azul corporativo
      tags: ["Profesional", "Creativo", "Productivo"],
    },
  ];

  const eventIncludes = [
    "Espacio frente al mar para ceremonia o celebración, con opción de privacidad",
    "Staff dedicado para tu evento",
    "Menú especial para grupos (adaptado a gustos y restricciones)",
    "Coctelería personalizada",
    "Música ambiente (opción de DJ o música en vivo)",
    "Logística y coordinación completa en isla",
    "Opción de incluir transporte en lancha para tus invitados",
    "Opciones de hospedaje para grupos en nuestras habitaciones",
  ];

  const additionalServices = [
    "Decoración",
    "Barra libre o coctelería temática",
    "Menús privados a cargo de nuestro chef",
    "Fotografía y video profesional",
    "DJ o música en vivo",
    "Paseo en bote o actividades acuáticas para el grupo",
    "Tour por Islas del Rosario antes o después del evento",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Título principal - Más elegante */}
      <Box sx={{ textAlign: "center", mb: 8, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: "2px",
          }}
        />
        <EventIcon
          sx={{
            fontSize: 50,
            color: theme.palette.primary.main,
            mb: 2,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 0%, transparent 100%)`,
            borderRadius: "50%",
            p: 1,
          }}
        />
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            //     background: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "var(--color-theme-dark-blue)",
            mb: 2,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Eventos en Mangata
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Celebra tus momentos especiales frente al mar con un servicio
          excepcional y personalizado
        </Typography>
      </Box>

      {/* Tipos de eventos - CARDS BONITAS Y COMPACTAS */}
      <Box sx={{ mb: 10 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "var(--color-theme-dark-blue)",
            }}
          >
            Tipos de Eventos
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            mb: 6,
            color: theme.palette.text.secondary,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Diseñamos experiencias únicas para cada ocasión especial
        </Typography>

        {/* Contenedor FLEX para las cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            mb: 4,
          }}
        >
          {eventTypes.map((event, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                flex: "1 1 300px",
                maxWidth: "350px",
                minWidth: "280px",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${alpha(theme.palette.grey[200], 0.8)}`,
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[8],
                  borderColor: alpha(event.color, 0.3),
                  "& .event-icon": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
              }}
            >
              {/* Header con gradiente */}
              <Box
                sx={{
                  height: "90px",
                  background: `linear-gradient(135deg, ${
                    event.color
                  } 0%, ${alpha(event.color, 0.8)} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "white",
                  padding: theme.spacing(3),
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  className="event-icon"
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: alpha("#ffffff", 0.2),
                    border: `2px solid ${alpha("#ffffff", 0.3)}`,
                    transition: "transform 0.3s ease",
                    mr: 2,
                  }}
                >
                  {React.cloneElement(event.icon, {
                    sx: {
                      fontSize: 24,
                      color: "white",
                    },
                  })}
                </Avatar>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    lineHeight: 1.2,
                    flex: 1,
                    textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                >
                  {event.title}
                </Typography>
              </Box>

              {/* Contenido */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    fontSize: "0.9rem",
                    mb: 2,
                  }}
                >
                  {event.description}
                </Typography>

                {/* Tags */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    mt: "auto",
                  }}
                >
                  {event.tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        height: "20px",
                        backgroundColor: alpha(event.color, 0.08),
                        color: event.color,
                        fontWeight: 500,
                        border: `1px solid ${alpha(event.color, 0.2)}`,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Instrucción visual para scroll horizontal en móviles */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Desliza para ver más eventos →
          </Typography>
        </Box>
      </Box>

      {/* Sección de servicios incluidos */}
      <Box sx={{ mb: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.light,
              0.05
            )} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              opacity: 0.1,
            }}
          >
            <WaterIcon
              sx={{ fontSize: 150, color: theme.palette.primary.main }}
            />
          </Box>

          <Box sx={{ textAlign: "center", mb: 5, position: "relative" }}>
            <CheckIcon
              sx={{
                fontSize: 40,
                color: theme.palette.success.main,
                mb: 2,
                background: alpha(theme.palette.success.main, 0.1),
                borderRadius: "50%",
                p: 1,
              }}
            />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.dark,
                mb: 1,
              }}
            >
              Todo incluido en tu evento
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Nos encargamos de cada detalle para que solo te preocupes por
              disfrutar
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {eventIncludes.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  p: 2,
                  borderRadius: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.light, 0.08),
                  },
                }}
                key={index}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        fontSize: 16,
                        color: theme.palette.success.main,
                      }}
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    variant: "body1",
                    sx: {
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Personaliza tu experiencia */}
      <Box sx={{ mb: 10 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <PaletteIcon
            sx={{
              fontSize: 40,
              color: theme.palette.secondary.main,
              mb: 2,
              background: alpha(theme.palette.secondary.main, 0.1),
              borderRadius: "50%",
              p: 1,
            }}
          />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.dark,
              mb: 1,
            }}
          >
            Personaliza tu experiencia
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Agrega estos servicios para hacer tu evento aún más especial
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {additionalServices.map((service, index) => (
            <Box className="d-flex " key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.grey[200], 0.8)}`,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "grey",
                    borderColor: "grey",
                    backgroundColor: alpha(theme.palette.secondary.light, 0.05),
                  },
                }}
              >
                <AddIcon
                  sx={{
                    mr: 3,
                    fontSize: 28,
                    color: "grey",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  }}
                >
                  {service}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Llamada a la acción */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />

        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontWeight: 800,
            position: "relative",
            mb: 2,
          }}
        >
          ¿Listo para celebrar en Mangata?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            position: "relative",
            opacity: 0.9,
            fontWeight: 400,
          }}
        >
          Déjanos acompañarte en tu fecha especial
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<EventIcon />}
          endIcon={<NavigateNextIcon />}
          component={NavLink}
          to="/Contact"
          sx={{
            bgcolor: "white",
            color: theme.palette.primary.dark,
            fontWeight: 700,
            px: 5,
            py: 1.5,
            borderRadius: "50px",
            "&:hover": {
              bgcolor: "grey.50",
              transform: "scale(1.05)",
            },
            position: "relative",
            transition: "all 0.3s",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          }}
        >
          Contactar Ahora
        </Button>
      </Paper>
    </Container>
  );
};

export default Events;
