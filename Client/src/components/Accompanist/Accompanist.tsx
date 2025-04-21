/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import DialogSelectLunch from "./DialogSelectLunch";

/**Interfaces */
import { IPropsAccompanist } from "../../interfaces/IAccompanist";
import { useTranslation } from "react-i18next";
import TextFieldComponent from "../TextField/TextFieldComponent";

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
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { t } = useTranslation("reserve");
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 10,
          marginBottom: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            color: "#2B3D5E",
            marginBlock: 2,
          }}
        >
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
      <Box className="d-flex gap-16 flex-wrap flex-dirrection-row">
        <TextFieldComponent
          value={field.name}
          label={t("fullName")}
          onChange={(value) => onChange(index, KEY_NAME, value)}
          helperText={errors.name ? t("nameRequired") : ""}
          iconName="user"
          placeholder=""
        />

        <Autocomplete
          options={lunchOptions}
          value={field.lunch}
          fullWidth
          getOptionLabel={(option) => option.label}
          sx={{
            maxWidth: { md: 328, lg: 328 },
            margin: 0,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label={t("chooseLunch")}
              error={errors.lunch}
              sx={{ marginLeft: 0 }}
              helperText={errors.lunch ? t("lunchMandatory") : ""}
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
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
      <DialogSelectLunch
        openModal={openModal}
        setOpenModal={setOpenModal}
        lunchOptions={lunchOptions}
        callback={(values) => {
          onChange(index, KEY_LUNCH, values);
          setOpenModal(false);
        }}
      />
    </Box>
  );
};

export default Accompanist;
