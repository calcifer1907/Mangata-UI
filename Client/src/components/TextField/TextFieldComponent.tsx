/**Libreries */
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface IProps {
  dateChange: string;
  onChange: (date: string) => void;
  placeholder: string;
  type: string;
  iconColor: string;
  iconName: string;
}

const TextFieldComponent = ({
  dateChange,
  onChange,
  placeholder,
  type,
  iconColor,
  iconName,
}: IProps) => {
  return (
    <TextField
      variant="filled"
      margin="none"
      fullWidth
      label={placeholder}
      type={type}
      value={dateChange}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                icon={iconName}
                width="24"
                height="24"
                className={iconColor}
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
