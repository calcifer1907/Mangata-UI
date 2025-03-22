import React from "react";

import "./Button.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";

interface IButton {
  title: string;
  iconName: string;
  background: string;
  onClick: () => void;
}

const ButtonComponent: React.FC<IButton> = ({
  title,
  onClick,
  iconName,
  background,
}) => {
  return (
    <Box className={`container-button ${background}`}>
      <Button
        className="button color-theme-white"
        size="small"
        onClick={onClick}
        startIcon={<Icon icon={iconName} width="24" height="24" />}
      >
        {title}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
