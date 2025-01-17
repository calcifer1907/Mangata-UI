import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import LazyImage from "../LazyImage/LazyImage";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: "100%", height: "auto", margin: "0 auto" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <LazyImage {...srcset(item.img, 121, item.rows, item.cols)} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/MangataFire.jpg",
    title: "Fire",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/Mangata1.jpg",
    title: "Langosta",
    cols: 2,
    rows: 2,
  },
  {
    img: "/images/Mangata6.jpg",
    title: "Coffee",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/Mangata2.jpg",
    title: "Camera",
    rows: 2,
    cols: 2,
  },

  {
    img: "/images/Mangata4.jpg",
    title: "Hats",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/Mangata7.jpg",
    title: "Honey",
    rows: 2,
    cols: 2,
  },
];
