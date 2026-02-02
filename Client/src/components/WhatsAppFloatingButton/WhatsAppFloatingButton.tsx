import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab, Tooltip } from "@mui/material";

type WhatsAppFloatingButtonProps = {
  /**
   * WhatsApp number in international format (digits only preferred), e.g. "573001112233".
   * If not provided, will fall back to VITE_WHATSAPP_NUMBER or a sensible default.
   */
  phoneNumber?: string;
  /**
   * Optional prefilled message.
   * If not provided, will fall back to VITE_WHATSAPP_MESSAGE.
   */
  message?: string;
  /**
   * Tooltip label.
   */
  label?: string;
};

const DEFAULT_PHONE_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "573126056467";
const DEFAULT_MESSAGE =
  import.meta.env.VITE_WHATSAPP_MESSAGE ?? "Hola, quiero más información.";

function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^\d]/g, "");
}

function buildWhatsAppUrl(phoneNumber: string, message?: string) {
  const phone = normalizePhoneNumber(phoneNumber);
  const params = new URLSearchParams();
  if (message?.trim()) params.set("text", message.trim());
  const query = params.toString();
  return `https://wa.me/${phone}${query ? `?${query}` : ""}`;
}

export default function WhatsAppFloatingButton({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  message = DEFAULT_MESSAGE,
  label = "WhatsApp",
}: WhatsAppFloatingButtonProps) {
  const href = buildWhatsAppUrl(phoneNumber, message);

  return (
    <Tooltip title={label} placement="left">
      <Fab
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        sx={(theme) => ({
          position: "fixed",
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          zIndex: theme.zIndex.snackbar - 1,
          backgroundColor: "#25D366",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1EBE5D",
          },
        })}
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
}

