/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
} from "@mui/material";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from "react-hook-form";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { IUsers } from "../interfaces/IUser";

import { enqueueSnackbar } from "notistack";

import { format } from "@formkit/tempo";

import { methodUser } from "../utils/api/agent";
import { hashPassword } from "../generalFunctions/auth";

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectRole, setSelectRole] = useState<string>("");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const { handleSubmit, reset, control } = useForm<IUsers>({
    defaultValues: {
      FIRST_NAME: "",
      LAST_NAME: "",
      EMAIL: "",
      BANK_ACCOUNT: "",
      ROLE_ID: 0,
      PASSWORD: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const newData = data;
      newData.IS_ACTIVE = true;
      newData.CREATED_AT = format(new Date(), "YYYY/MM/DD");
      newData.PASSWORD = hashPassword(data.PASSWORD);
      const response = await methodUser.createUser(newData as IUsers);
      if (response.message === "success") {
        enqueueSnackbar("Se guardo correctamente el usurio", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        reset();
      }
    } catch (e: any) {
      if (e.status === 409) {
        const { response } = e;
        enqueueSnackbar(response.data.message, {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const roles = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Empleado" },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setInnerWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: { xs: "normal", md: "center" }, // Centrar contenido
        alignItems: "center", // Centrar contenido
        minHeight: "100vh", // Altura completa de la pantalla
        flexDirection: "column",
        paddingTop: { xs: 3, sm: 0, md: 0 }, // Padding top
      }}
    >
      <Box
        sx={{
          width: { xs: `${innerWidth - 10}px`, sm: "400px", md: "650px" }, // Tamaño dinámico
          height: { xs: "auto", sm: "400px", md: "650px" }, // Tamaño dinámico
          backgroundColor: { xs: "#FFFFFF", md: "#2B3D5E" }, // Color del círculo
          borderRadius: "50%", // Hacerlo circular
          display: "flex", // Centrar contenido dentro del círculo
          flexDirection: "column", // Organizar en columna
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            placeItems: "center",
            height: "100%",
            width: { xs: "70%", sm: "60%", md: "60%" },
            margin: "auto",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              mt: 2,
            }}
          >
            <Controller
              name="FIRST_NAME"
              control={control}
              rules={{
                required: "El nombre es obligario",
                pattern: {
                  value: /^[a-zA-Z]/,
                  message: "Ingrese un nombre valido",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Primer nombre"
                  variant="filled"
                  margin="none"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:user-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "#2B3D5E" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    background: "#FFFFFF",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: { xs: 1, sm: 2, md: 2 },
                    marginTop: { xs: 0, sm: 1, md: 1 },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="LAST_NAME"
              control={control}
              rules={{
                required: "El apellido es obligario",
                pattern: {
                  value: /^[a-zA-Z]/,
                  message: "Ingrese un apellido valido",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="text"
                  label="Apellido"
                  variant="filled"
                  margin="none"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:key-minimalistic-square-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "#2B3D5E" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    background: "#FFFFFF",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: { xs: 1, sm: 2, md: 2 },
                    marginTop: { xs: 0, sm: 1, md: 1 },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="EMAIL"
              control={control}
              rules={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingrese un correo válido",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="emil"
                  variant="filled"
                  margin="none"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:user-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "#2B3D5E" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    background: "#FFFFFF",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: { xs: 1, sm: 2, md: 2 },
                    marginTop: { xs: 0, sm: 1, md: 1 },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="PASSWORD"
              control={control}
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 8 caracteres",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#?¡¿/=])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Ingrese una contraseña segura",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Contraseña"
                  variant="filled"
                  margin="none"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:key-minimalistic-square-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "#2B3D5E" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon
                            icon={
                              showPassword
                                ? "solar:eye-closed-bold-duotone"
                                : "solar:eye-bold-duotone"
                            }
                            width="24"
                            height="24"
                            style={{ color: "#2B3D5E", cursor: "pointer" }}
                            onClick={handleShowPassword}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    background: "#FFFFFF",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: { xs: 1, sm: 2, md: 2 },
                    marginTop: { xs: 0, sm: 1, md: 1 },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="ROLE_ID"
              control={control}
              rules={{ required: "El role obligario" }}
              render={({
                field: { onChange, value, ...field },
                fieldState,
              }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  sx={{
                    background: "#FFFFFF",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: { xs: 1, sm: 2, md: 2 },
                    marginTop: { xs: 0, sm: 1, md: 1 },
                  }}
                  variant="filled"
                  margin="none"
                  placeholder="Seleccione un role"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:users-group-rounded-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "#2B3D5E" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  value={value}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    const selectedRole = roles.find(
                      (role) => role.value === Number(event.target.value)
                    );
                    if (selectedRole) {
                      setSelectRole(selectedRole.label);
                    }
                    onChange(event.target.value);
                  }}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {selectRole === "Empleado" && selectRole && (
              <Controller
                name="BANK_ACCOUNT"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Cuenta banco"
                    variant="filled"
                    margin="none"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon
                              icon="solar:key-minimalistic-square-bold-duotone"
                              width="24"
                              height="24"
                              style={{ color: "#2B3D5E" }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      background: "#FFFFFF",
                      borderRadius: "8px 8px 0 0",
                      marginBottom: { xs: 1, sm: 2, md: 2 },
                      marginTop: { xs: 0, sm: 1, md: 1 },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
            <Box
              sx={{
                display: "grid",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="text"
                color="primary"
                startIcon={
                  <Box
                    component={Icon}
                    icon="solar:safe-square-bold-duotone"
                    width="24"
                    height="24"
                    sx={{ color: { xs: "#FFFFFF", md: "#2B3D5E" } }}
                  />
                }
                sx={{
                  mt: 2,
                  width: 140,
                  textTransform: "none",
                  background: "#FFFFFF",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 500,
                  color: { xs: "#FFFFFF", md: "#2B3D5E" },
                  backgroundColor: { xs: "#2B3D5E", md: "#FFFFFF" },
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          borderRadius: 20,
          backgroundColor: "#2B3D5E",
          width: "100%",
          height: 20,
          marginTop: 49,
        }}
      />
    </Container>
  );
};

export default CreateUser;
