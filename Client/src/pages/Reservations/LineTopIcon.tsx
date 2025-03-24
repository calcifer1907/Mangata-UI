import { Box } from "@mui/material";
import { Icon } from "@iconify/react";

interface IProps {
  isVisibleGrid: boolean;
}

const LineTopIcon = ({ isVisibleGrid }: IProps) => {
  return (
    <>
      <Box
        className="purchase-summary-line-top"
        sx={{
          display: { xs: "block", md: "none" },
        }}
      />

      <Box style={{ width: "100%", textAlign: "center", height: "24px" }}>
        <Icon
          icon={`solar:alt-arrow-${isVisibleGrid ? "down" : "up"}-bold-duotone`}
          width="24"
          height="24"
          className="color-theme-white w-100"
        />
      </Box>
    </>
  );
};

export default LineTopIcon;
