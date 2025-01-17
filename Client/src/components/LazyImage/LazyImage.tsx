import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface ILazyImageProps {
  src: string;
  srcSet: string;
}

const LazyImage = (props: ILazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      <img
        {...props}
        alt=""
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: isLoaded ? "block" : "none", // Oculta hasta que cargue
        }}
      />
    </>
  );
};

export default LazyImage;
