import React from "react";
import { TextField, Autocomplete, Box, IconButton } from "@mui/material";

// Definimos la interfaz para las props
interface FieldRowProps {
  index: number;
  field: { name: string; lunch: string };
  errors: { name: boolean; lunch: boolean };
  onChange: (index: number, name: string, value: string) => void;
  onRemove: (index: number) => void;
  lunchOptions: { value: string; label: string }[];
}

const FieldRow: React.FC<FieldRowProps> = ({
  index,
  field,
  errors,
  onChange,
  onRemove,
  lunchOptions,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      {/* Input de Nombre */}
      <TextField
        label="Nombre"
        variant="outlined"
        value={field.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        error={errors.name}
        helperText={errors.name ? "Este campo es obligatorio" : ""}
      />

      {/* Autocomplete para Almuerzos */}
      <Autocomplete
        options={lunchOptions}
        getOptionLabel={(option) => option.label}
        value={
          lunchOptions.find((option) => option.value === field.lunch) || null
        }
        onChange={(_, newValue) =>
          onChange(index, "lunch", newValue ? newValue.value : "")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Almuerzo"
            variant="outlined"
            error={errors.lunch}
            helperText={errors.lunch ? "Seleccione un almuerzo" : ""}
          />
        )}
      />

      {/* Botón de Eliminar */}
      <IconButton onClick={() => onRemove(index)} color="error">
        delete
      </IconButton>
    </Box>
  );
};

export default FieldRow;
