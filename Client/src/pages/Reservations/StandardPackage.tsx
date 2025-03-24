import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Icon } from "@iconify/react";

interface IProps {
  title1: string;
  title2: string;
  iconName: string;
  marginBottom?: number;
}

const StandardPackage = ({
  title1,
  title2,
  iconName,
  marginBottom,
}: IProps) => {
  return (
    <Box position="relative" sx={{ marginBottom }}>
      <Box
        className="wd-24 hg-24 p-absolute"
        component={Icon}
        icon={`solar:${iconName}-bold-duotone`}
        sx={{
          color: {
            xs: "var(--color-theme-white)",
            sm: "var(--color-theme-white)",
            md: "var(--color-theme-dark-blue)",
          },
        }}
      />
      <Box
        className="d-flex justify-content-between align-items-center standard-package"
        sx={{
          borderBlockEndColor: {
            xs: title1 === "Total" ? "none" : "var(--color-theme-white)",
            md: title1 === "Total" ? "none" : "var(--color-theme-black)",
          },
        }}
      >
        <Box className="d-flex align-items-center">
          <Typography
            className={`${
              title1 !== "Total" ? "total-title-1" : "total-title-2"
            } `}
            sx={{
              color: {
                xs: "var(--color-theme-white)",
                md: "var(--color-theme-black)",
              },
            }}
          >
            {title1}
          </Typography>
        </Box>
        <Typography
          className={`${
            title1 !== "Total" ? "total-title-1" : "total-title-2"
          }`}
          sx={{
            color: {
              xs: "var(--color-theme-white)",
              md: "var(--color-theme-black)",
            },
          }}
        >
          {title2}
        </Typography>
      </Box>
    </Box>
  );
};

export default StandardPackage;
