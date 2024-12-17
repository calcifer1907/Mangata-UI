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
import { useState } from "react";
import { IUsers } from "../interfaces/IUser";

import { enqueueSnackbar } from "notistack";

import { format } from "@formkit/tempo";

import { methodUser } from "../utils/api/agent";

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectRole, setSelectRole] = useState<string>("");
  const { handleSubmit, reset, control } = useForm<IUsers>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      account_bank: "",
      role: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const newData = data;
      newData.is_active = 1;
      newData.created_at = format(new Date(), "YYYY/MM/DD");
      const response = await methodUser.createUser(newData as IUsers);
      console.log(response);
      enqueueSnackbar("Se guardo correctamente el usurio", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      reset();
      //   navigation("/home");
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
      //   navigation("/Login");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const roles = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Empleado" },
  ];

  // const handleFindRole = (id: number) => {
  //   return roles.some(({ value }) => value);
  // };

  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#2B3D5E",
          width: 650,
          height: 650,
          borderRadius: "50%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            placeItems: "center",
            height: "100%",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              mt: 2,
              width: "22rem",
            }}
          >
            <Controller
              name="first_name"
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
                  margin="normal"
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
                  sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="last_name"
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
                  margin="normal"
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
                  sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
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
                  margin="normal"
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
                  sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="account_bank"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Cuenta banco"
                  variant="filled"
                  margin="normal"
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
                  sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 8 caracteres",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
                  margin="normal"
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
                  sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="role"
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
                  sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
                  variant="filled"
                  margin="normal"
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
                    event: React.ChangeEvent<HTMLInputElement>,
                    child: React.ReactNode
                  ) => {
                    const { props } = child as React.ReactElement;
                    setSelectRole(props.children as string);
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
                  <Icon
                    icon="solar:safe-square-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
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
                  color: "#2B3D5E",
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
      ></Box>
    </Container>
  );
};

export default CreateUser;
