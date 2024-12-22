import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";

import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**Hooks */
import { useContextUser } from "../hooks/useContextUser";

/**APis */
import { login } from "../utils/api/agent";

import LogoMangata from "../assets/Mangata.svg";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigation = useNavigate();
  const { setUserInfo } = useContextUser();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login.loginPage(data);
      setUserInfo(response);
      localStorage.setItem("info", JSON.stringify(response));
      navigation("/home");
    } catch (e) {
      console.log(e);
      navigation("/Login");
    }
  };

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
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
        }}
      >
        <Box display="flex" justifyContent="center">
          <img src={LogoMangata} alt="Mangata" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
            <TextField
              fullWidth
              label="Usuario"
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
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingrese un correo válido",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              type="password"
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
                },
              }}
              sx={{ background: "#FFFFFF", borderRadius: "8px 8px 0 0" }}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
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
                    icon="solar:login-3-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
                  />
                }
                sx={{
                  mt: 2,
                  width: 157,
                  textTransform: "none",
                  background: "#FFFFFF",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#2B3D5E",
                }}
              >
                Iniciar Sesión
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

export default Login;
