import { enqueueSnackbar } from "notistack";

export const validEmail = (value: string) => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmail.test(value);
};

export const handleCopy = async () => {
  const code_reserva = document.getElementById("code_reserva");
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(code_reserva?.textContent || "");
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = code_reserva?.textContent || "";
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  } catch (error) {
    console.log("Error al copiar el codigo de reserva", error);
    enqueueSnackbar(JSON.stringify(error), {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  }
};
