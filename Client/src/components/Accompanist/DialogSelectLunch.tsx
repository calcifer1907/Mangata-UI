import { Modal, Box, Paper, Typography } from "@mui/material";

import { IOptions } from "../../interfaces/IAccompanist";

import LazyImage from "../LazyImage/LazyImage";

interface IProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  lunchOptions: IOptions[];
  callback: (value: IOptions) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "16px",
  pt: 2,
  px: 1,
  pb: 3,
};

const DialogSelectLunch = ({
  openModal,
  setOpenModal,
  lunchOptions,
  callback,
}: IProps) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: { xs: 320, lg: 400 },
          height: 500,
        }}
      >
        <Box
          className="scrollable-container"
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
            padding: 2,
          }}
        >
          {lunchOptions.map((values) => (
            <Paper key={values.value} sx={{ marginBottom: 2 }}>
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => callback(values)}
              >
                {/* <img
                  width="100%"
                  alt={values.label.toLowerCase().replaceAll(" ", "")}
                  src={`/images/lunche/${values.label
                    .toLowerCase()
                    .replaceAll(" ", "")}.jpg`}
                /> */}

                <LazyImage
                  src={`/images/lunche/${values.label
                    .toLowerCase()
                    .replaceAll(" ", "")}.jpg`}
                />

                <Typography
                  sx={{
                    color: "var(--blueDarkLigth)",
                    fontWeight: 600,
                    fontSize: 22,
                    margin: 2,
                    textAlign: "center",
                  }}
                >
                  {values.label}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default DialogSelectLunch;
