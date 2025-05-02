import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
