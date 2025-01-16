import { Box, Typography } from "@mui/material";

interface IProsp {
  title: string;
  img: string;
}

const Cards = ({ title, img }: IProsp) => {
  return (
    <Box sx={{ width: "25%", maxWidth: "15%", minWidth: "280px" }}>
      <Box
        component="img"
        src={img}
        sx={{
          width: "100%",
          height: "320px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          background: "#FFFFFF",
          height: "120px",
          borderRadius: " 10px 10px ",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            color: "#4672a5",
            textAlign: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingInline: 5,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cards;
