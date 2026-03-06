import { enqueueSnackbar } from "notistack";

export const messageSnackbar = (
  message: string,
  variant: "success" | "error" | "info" | "warning",
) => {
  enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};
