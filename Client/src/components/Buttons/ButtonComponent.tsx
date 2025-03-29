import React from "react";

/**Styles */
import "./Button.scss";

/**Libreries */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";

interface IButton {
  title: string;
  iconName: string;
  background: string;
  onClick: () => void;
  colorTitle?: string;
}

const ButtonComponent: React.FC<IButton> = ({
  title,
  onClick,
  iconName,
  background,
  colorTitle = "white",
}) => {
  return (
    <Box className={`container-button ${background}`}>
      <Button
        className={`button color-theme-${colorTitle}`}
        size="medium"
        onClick={onClick}
        startIcon={<Icon icon={iconName} width="24" height="24" />}
      >
        {title}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
