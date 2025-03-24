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
}

const TextFieldComponent = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  iconColor = "color-blue-dark",
  helperText,
  iconName,
}: IProps) => {
  return (
    <TextField
      variant="filled"
      margin="none"
      fullWidth
      placeholder={placeholder}
      label={label}
      type={type}
      value={value}
      error={value === ""}
      onChange={(e) => onChange(e.target.value)}
      helperText={value === "" ? helperText : ""}
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
      InputLabelProps={{
        shrink: true, // Asegura que la etiqueta permanezca arriba
      }}
      sx={{
        background: "#FFFFFF",
        borderRadius: "8px 8px 0 0",
        maxWidth: "328px",
      }}
    />
  );
};

export default TextFieldComponent;
