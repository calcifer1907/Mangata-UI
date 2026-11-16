import { FC } from "react";
/**Libreries */
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface IProps {
  onChange: (date: string) => void;
  value: string;
  label: string;
  placeholder: string;
  type?: string;
  iconColor?: string;
  iconName: string;
  helperText?: string;
  error?: boolean;
}

const TextFieldComponent: FC<IProps> = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  iconColor = "color-blue-dark",
  helperText,
  iconName,
  error = false,
}) => {
  return (
    <TextField
      variant="filled"
      margin="none"
      placeholder={placeholder}
      label={label}
      type={type}
      fullWidth
      value={value}
      error={error}
      onChange={(e) => onChange(e.target.value)}
      helperText={error ? helperText : ""}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                icon={`solar:${iconName}-bold-duotone`}
                className={iconColor}
                width="24"
                height="24"
              />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        background: "#FFFFFF",
        maxWidth: { md: 328, lg: 328 },
      }}
    />
  );
};

export default TextFieldComponent;
