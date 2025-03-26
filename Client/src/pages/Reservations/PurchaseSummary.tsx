import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IProps {
  isVisibleGrid: boolean;
  price: string;
}

const PurchaseSummary = ({ isVisibleGrid, price }: IProps) => {
  return (
    <Box className="d-flex justify-content-center align-items-center gap-16 margin-top-8">
      <Box
        component={Icon}
        className="wd-24 hg-24"
        icon="solar:bill-check-bold-duotone"
        sx={{
          color: {
            xs: "var(--color-theme-white)",
            sm: "var(--color-theme-white)",
            md: "#var(--color-theme-dark-blue)",
          },
        }}
      />

      <Typography
        className="title-sale"
        sx={{
          color: {
            xs: "var(--color-theme-white)",
            md: "#var(--color-theme-dark-blue)",
          },
        }}
      >
        Resumen de compra
        {isVisibleGrid && (
          <Typography
            className="title-total"
            component="span"
            sx={{
              color: {
                xs: "var(--color-theme-white)",
                md: "#var(--color-theme-dark-blue)",
              },
              display: { xs: "block", md: "none" },
            }}
          >
            Total: <span>{price}</span>
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

export default PurchaseSummary;
