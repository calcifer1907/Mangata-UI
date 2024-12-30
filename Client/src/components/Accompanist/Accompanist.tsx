/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import {
  Autocomplete,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

/**Interfaces */
import { IOptions, IPropsAccompanist } from "../../interfaces/IAccompanist";

const KEY_NAME = "name";
const KEY_LUNCH = "lunch";

const Accompanist: FC<IPropsAccompanist> = ({
  title,
  icon,
  errors,
  field,
  index,
  onChange,
  onRemove,
  lunchOptions,
}) => (
  <Box sx={{ marginBottom: 2 }}>
    <Box
      sx={{
        display: "flex",
        gap: 10,
        marginBottom: 1,
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#2B3D5E" }}>
        {title}
      </Typography>
      {icon && (
        <Icon
          icon="solar:trash-bin-trash-bold-duotone"
          width="24"
          height="24"
          style={{ color: "#2B3D5E" }}
          onClick={() => {
            onRemove(index);
          }}
        />
      )}
    </Box>
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 2, sm: 2, md: 2 }}
      sx={{ flexWrap: "wrap" }}
    >
      <Box sx={{ marginBottom: { xs: 12, sm: 12, md: 0 } }}>
        <TextField
          label="Nombre Completo"
          variant="filled"
          name="name"
          fullWidth
          sx={{ width: "100%", maxWidth: 328, minWidth: 328 }}
          value={field.name}
          onChange={(e) => onChange(index, KEY_NAME, e.target.value)}
          error={errors.name}
          helperText={errors.name ? "El Nombre es obligatorio" : ""}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="solar:user-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box>
        <Autocomplete
          options={lunchOptions}
          value={field.lunch}
          onChange={(_, newValue: IOptions | null) =>
            onChange(
              index,
              KEY_LUNCH,
              newValue ? newValue : { label: "", value: 0 }
            )
          }
          getOptionLabel={(option) => option.label}
          sx={{ width: "100%", maxWidth: 328, minWidth: 328, margin: 0 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Elige el almuerzo"
              fullWidth
              error={errors.lunch}
              sx={{ marginLeft: 0 }}
              helperText={errors.lunch ? "El Almuerzo es obligatorio" : ""}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Icon
                    icon="solar:ladle-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
                  />
                ),
              }}
            />
          )}
        />
      </Box>
    </Stack>
  </Box>
);

export default Accompanist;
