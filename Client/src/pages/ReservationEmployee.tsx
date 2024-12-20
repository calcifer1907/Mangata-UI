/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Box, Button, Grid2, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { format } from "@formkit/tempo";

import { formatPrice } from "../generalFunctions/formaters";
import Accompanist from "../components/Accompanist/Accompanist";

import { IFields } from "../interfaces/IAccompanist";

const PRICE = 390000;

const ReservationEmployee = () => {
  const [fields, setFields] = useState<IFields[]>([
    { name: "", lunch: { label: "", value: 0 } },
  ]);
  const [errors, setErrors] = useState<{ name: boolean; lunch: boolean }[]>([]);
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);

  const optionsLunches = [
    { value: "pizza", label: "Pizza" },
    { value: "pasta", label: "Pasta" },
    { value: "salad", label: "Ensalada" },
    { value: "burger", label: "Hamburguesa" },
  ];

  // Maneja los cambios en los campos
  const handleChange = (index: number, fieldName: string, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
    setFields(updatedFields);

    // Limpiar errores al cambiar algo
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [fieldName]: value.trim() === "",
    };
    setErrors(updatedErrors);
  };

  // Valida que todos los campos estén llenos
  const validateFields = (): boolean => {
    const validationErrors = fields.map((field) => ({
      name: field.name.trim() === "",
      lunch: field.lunch.label.trim() === "",
    }));
    setErrors(validationErrors);
    return !validationErrors.some((error) => error.name || error.lunch);
  };

  // Agrega una nueva fila si la validación es exitosa
  const addField = () => {
    if (validateFields()) {
      setFields([...fields, { name: "", lunch: { label: "", value: 0 } }]);
      setErrors([...errors, { name: false, lunch: false }]);
    } else {
      alert("Por favor, complete todos los campos antes de agregar más.");
    }
  };

  // Elimina una fila específica
  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setFields(updatedFields);
    setErrors(updatedErrors);
  };

  const calculatePrice = () => {
    const newPrice = PRICE * fields.length;
    const FORMAT_PRICE = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(newPrice);
    return FORMAT_PRICE;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // maxHeight: `${maxHeight}px`,
        width: "100%",
        overflow: "auto",
      }}
    >
      <Grid2 spacing={2} sx={{ height: "100vh" }} container>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box
            sx={{
              paddingInline: 4,
              position: "relative",
            }}
          >
            <Box style={{ marginBottom: 30 }}>
              <Typography
                sx={{ fontSize: 36, color: "#2B3D5E", fontWeight: 800 }}
              >
                Reserva tu día - CR728PE
              </Typography>
              <Box
                style={{
                  backgroundColor: "#2B3D5E",
                  height: 6,
                  position: "absolute",
                  top: 50,
                  width: "90%",
                  left: 0,
                }}
              />
              <h5
                style={{
                  fontSize: 24,
                  fontWeight: 300,
                  color: "#2B3D5E",
                  marginTop: 5,
                }}
              >
                Asesor: <span>Camilo Diaz</span>
              </h5>
            </Box>
            <Box
              style={{
                backgroundColor: "#2B3D5E",
                height: 40,
                width: 178,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                gap: 8,
                marginBottom: 20,
              }}
            >
              <Button
                size="small"
                sx={{ textTransform: "none", fontSize: 14, color: "#FFFFFF" }}
                onClick={addField}
                startIcon={
                  <Icon
                    icon="solar:user-plus-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#FFFFFF" }}
                  />
                }
              >
                Agregar persona
              </Button>
            </Box>
            <Box
              sx={{
                maxHeight: { xs: 370, sm: 370, md: 500 },
                overflowY: "auto",
                overflowX: "hidden",
                height: "100%",
              }}
            >
              {fields.map((field, index: number) => (
                <Accompanist
                  icon={!(index === 0)}
                  key={field.name ?? index}
                  title={
                    index === 0 ? "Datos Personales" : `Acompañante ${index}`
                  }
                  index={index}
                  handleChange={handleChange}
                  onRemove={removeField}
                  field={field}
                  errors={errors[index] || { name: false, lunch: false }}
                  optionsLunches={optionsLunches}
                />
              ))}
              {fields.map((field, index) => (
                <FieldRows
                  key={index}
                  index={index}
                  field={field}
                  errors={errors[index] || { name: false, lunch: false }}
                  onChange={handleChange}
                  onRemove={removeField}
                  lunchOptions={lunchOptions}
                />
              ))}
            </Box>
          </Box>
        </Grid2>
        <Grid2
          size={{ xs: 1, sm: 1 }}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Box
            style={{
              backgroundColor: "#2B3D5E",
              height: "70%",
              position: "relative",
              top: 100,
              width: 6,
            }}
          />
        </Grid2>

        <Grid2
          component="div"
          size={{ xs: 12, sm: 12, md: 12, lg: 5 }}
          sx={{
            position: {
              xs: "absolute",
              sm: "absolute",
              md: "inherit",
            },
            bottom: { xs: 0, sm: 0, md: "inherit" },
            borderRadius: "16px 16px 0px 0px",
            backgroundColor: {
              xs: "#2B3D5E",
              sm: "#2B3D5E",
              md: "#FFFFFF",
              lg: "#FFFFFF",
            },
            zIndex: 1,
            height: {
              xs: isVisibleGrid ? 320 : 100,
              sm: isVisibleGrid ? 320 : 100,
              md: 550,
            },
            maxHeight: { xs: 550, sm: 550 },
            transition: "height 0.2s",
            overflow: "hidden",
            cursor: "pointer",
            width: "100%",
          }}
          onClick={() => setIsVisibleGrid((prev) => !prev)}
        >
          <Box
            sx={{
              backgroundColor: "#D9D9D947",
              width: "60%",
              height: "3px",
              margin: "0 auto",
              marginTop: 1,
              display: { xs: "block", md: "none" },
            }}
          />
          <Box
            sx={{
              width: {
                xs: "calc(100% - 30px)",
                sm: "calc(100% - 30px)",
                md: 550,
              },
              margin: "0 auto",
            }}
          >
            <Box
              component="img"
              sx={{
                content: {
                  xs: "url(http://192.168.0.233:5173/images/logoMangataWhite.png)",
                  sm: "url(http://192.168.0.233:5173/images/logoMangataWhite.png)",
                  md: "url(http://localhost:5173/images/logoMangataBlue.png)",
                },
                display: { xs: "none", md: "flex" },
                margin: "0 auto",
              }}
              alt="Logo Mangata"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 4,
                  marginTop: 4,
                  gap: 2,
                }}
              >
                <Box
                  component={Icon}
                  icon="solar:bill-check-bold-duotone"
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                  }}
                />

                <Typography
                  sx={{
                    color: { xs: "#FFFFFF", md: "#2B3D5E" },
                    fontSize: 20,
                    fontWeight: 800,
                  }}
                >
                  Resumen de compra
                  {!isVisibleGrid && (
                    <Typography
                      component="span"
                      sx={{
                        color: { xs: "#FFFFFF", md: "#2B3D5E" },
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      Total: <span>{calculatePrice()}</span>
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Box
                component="img"
                sx={{
                  content: {
                    xs: "url(http://192.168.0.233:5173/images/logoMangataWhite.png)",
                    sm: "url(http://192.168.0.233:5173/images/logoMangataWhite.png)",
                  },
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  display: { xs: "block", sm: "block", md: "flex" },
                }}
                alt="Logo Mangata"
              />
            </Box>
            <Box>
              <Box position="relative">
                <Box
                  component={Icon}
                  icon="solar:suitcase-tag-bold-duotone"
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                    position: "absolute",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    borderBottom: "1px solid",
                    borderColor: { xs: "#ffff", md: "#000000" },
                    marginInlineStart: 5,
                    marginBottom: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                      Paquete Estandar
                    </Typography>

                    <Box
                      component={Icon}
                      icon="solar:info-circle-bold-duotone"
                      sx={{
                        width: "24px",
                        height: "24px",
                        color: {
                          xs: "#FFFFFF",
                          sm: "#FFFFFF",
                          md: "#2B3D5E",
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                    {formatPrice(PRICE)}
                  </Typography>
                </Box>
              </Box>
              <Box position="relative" sx={{ marginBottom: 2 }}>
                <Box
                  component={Icon}
                  icon="solar:calendar-bold-duotone"
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                    position: "absolute",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    borderColor: { xs: "#ffff", md: "#000000" },
                    marginInlineStart: 5,
                  }}
                >
                  <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                    Fecha
                  </Typography>
                  <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                    {format(new Date(), "DD/MM/YYYY")}
                  </Typography>
                </Box>
              </Box>
              <Box position="relative" style={{ marginBottom: 16 }}>
                <Box
                  component={Icon}
                  icon="solar:users-group-rounded-bold-duotone"
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                    position: "absolute",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    borderBottom: "1px solid",
                    borderColor: { xs: "#ffff", md: "#000000" },
                    marginInlineStart: 5,
                  }}
                >
                  <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                    Personas
                  </Typography>
                  <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                    {fields.length}
                  </Typography>
                </Box>
              </Box>
              <Box position="relative" style={{ marginBottom: 16 }}>
                <Icon
                  icon="solar:cart-large-4-bold-duotone"
                  width="24"
                  height="24"
                  style={{ color: "#2B3D5E", position: "absolute" }}
                />
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginInlineStart: 48,
                  }}
                >
                  <Typography
                    sx={{
                      color: { xs: "#FFFFFF", md: "#2B3D5E" },
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      color: { xs: "#FFFFFF", md: "#2B3D5E" },
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    {calculatePrice()}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box
                sx={{
                  backgroundColor: {
                    xs: "#FFFFFF",
                    sm: "#FFFFFF",
                    md: "#2B3D5E",
                  },
                  height: 40,
                  width: 178,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    color: { xs: "#2B3D5E", sm: "#2B3D5E", md: "#FFFFFF" },
                  }}
                  // onClick={handleReservation}
                  startIcon={
                    <Box
                      component={Icon}
                      icon="solar:user-plus-bold-duotone"
                      sx={{
                        width: "24px",
                        height: "24px",
                        color: {
                          xs: "#2B3D5E",
                          sm: "#2B3D5E",
                          md: "#FFFFFF",
                        },
                      }}
                    />
                  }
                >
                  Reservar
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      {/* <Box
        style={{
          backgroundColor: "#2B3D5E",
          position: "fixed",
          height: 600,
          width: 600,
          bottom: -250,
          right: -250,
          borderRadius: "50%",
        }}
      /> */}
    </Box>
  );
};

export default ReservationEmployee;
