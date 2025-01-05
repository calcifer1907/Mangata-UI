import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1200,
      xl: 1400,
    },
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: {
  //       body: {
  //         margin: 0,
  //         padding: 0,
  //         boxSizing: "border-box",
  //       },
  //     },
  //   },
  // },
});

export default theme;
