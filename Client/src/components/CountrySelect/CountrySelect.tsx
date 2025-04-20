import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { countries } from "../../constant/Country";
import { useContextAccompanist } from "../../hooks/useReservation/useContextReservation";

import LazyImage from "../LazyImage/LazyImage";

const CountrySelect = () => {
  const { t } = useTranslation("reserve");
  const { selectedCountry, setSelectedCountry } = useContextAccompanist();
  return (
    <Autocomplete
      options={countries}
      getOptionLabel={(option) => option.label}
      sx={{ maxWidth: 328, minWidth: { xs: 300, lg: 328 }, margin: 0 }}
      value={selectedCountry}
      onChange={(_, newValue) => {
        setSelectedCountry(newValue);
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <LazyImage
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          helperText={!selectedCountry ? t("chooseCountryRequired") : ""}
          label={t("chooseCountry")}
          placeholder={t("enterCountry")}
          error={!selectedCountry}
          value={selectedCountry}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Icon
                icon="solar:globus-bold-duotone"
                width="24"
                height="24"
                style={{ color: "#2B3D5E" }}
              />
            ),
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
