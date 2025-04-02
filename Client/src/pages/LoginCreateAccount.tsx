import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "auto",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6490c7 0%, #2B3D5E 100%)",
  color: "white",
  padding: theme.spacing(6),
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
  },
}));

const AuthForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login data:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Register data:", formData);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: isMobile ? 2 : 4,
        backgroundColor: "#f5f7fa",
      }}
    >
      <StyledCard>
        <Grid container>
          {!isMobile && (
            <Grid item md={5}>
              <LeftPanel>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
                  {isLogin
                    ? "To keep connected with us please login with your personal info"
                    : "Enter your personal details to create an account"}
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {isLogin ? "Need an account?" : "Already have an account?"}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "white",
                      },
                    }}
                  >
                    {isLogin ? "SIGN UP" : "LOGIN"}
                  </Button>
                </Box>
              </LeftPanel>
            </Grid>
          )}

          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: isMobile ? 3 : 6 }}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 4,
                  color: theme.palette.primary.main,
                }}
              >
                {isLogin ? "LOGIN TO YOUR ACCOUNT" : "SIGN UP"}
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {!isLogin && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={!isLogin}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>
                  {!isLogin && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={!isLogin}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        background: "#4672a5",
                        borderRadius: "100px",
                      }}
                    >
                      {isLogin ? "Login" : "Create Account"}
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {isMobile && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{ mt: 1 }}
                  >
                    {isLogin ? "SIGN UP INSTEAD" : "LOGIN INSTEAD"}
                  </Button>
                </>
              )}

              {isLogin && (
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 3, color: "text.secondary" }}
                >
                  Forgot your password?{" "}
                  <Button color="primary" size="small">
                    Reset it
                  </Button>
                </Typography>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </StyledCard>
    </Box>
  );
};

export default AuthForm;
