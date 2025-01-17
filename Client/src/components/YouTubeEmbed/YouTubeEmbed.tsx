import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const YouTubeEmbed: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      <div className={`video-background-container ${isLoaded ? "active" : ""}`}>
        <Box
          className="content-overlay"
          sx={{ height: { xs: "100%", md: "75%" } }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", md: "4.5rem" },
              paddingBottom: { xs: 0, md: "26px" },
            }}
          >
            Mangata
          </Typography>
        </Box>
      </div>

      <iframe
        className="video-background"
        src="https://www.youtube-nocookie.com/embed/bKUlPNfPho8?modestbranding=1&amp;enablejsapi=1&amp;disablekb=1&amp;wmode=transparent&amp;controls=0&amp;playsinline=0&amp;showinfo=0&amp;mute=1&amp;rel=0&amp;autoplay=1&amp;loop=1&amp;iv_load_policy=3&amp;playlist=bKUlPNfPho8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "none",
        }}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default YouTubeEmbed;
