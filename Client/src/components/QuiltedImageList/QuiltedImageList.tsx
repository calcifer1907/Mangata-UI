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
          style={{ position: "relative" }}
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <LazyImage
            {...srcset(item.img, 121, item.rows, item.cols)}
            title={item.title}
            titleEN={item.titleEN}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/lunche/filete de pescado apanado.jpg",
    title: "Filete de pescado apanado",
    titleEN: "Breadded fish fillet",
    rows: 4,
    cols: 2,
  },
  {
    img: "/images/lunche/nuggets de pollo.jpg",
    title: "Nuggets de pollo",
    titleEN: "Chicken nuggets",
    cols: 2,
    rows: 7,
  },
  {
    img: "/images/lunche/pasta boloñesa.jpg",
    title: "Pasta boloñesa",
    titleEN: "Bolonese pasta",
    rows: 4,
    cols: 2,
  },
  {
    img: "/images/lunche/pasta vegetariana.jpg",
    title: "Pasta vegetariana",
    titleEN: "Vegetarian pasta",
    rows: 4,
    cols: 2,
  },

  {
    img: "/images/lunche/pescado frito.jpg",
    title: "Pescado frito",
    titleEN: "Fried fish",
    rows: 4,
    cols: 2,
  },
  {
    img: "/images/lunche/risoto.jpg",
    title: "Risoto",
    titleEN: "Risoto",
    rows: 3,
    cols: 2,
  },
  {
    img: "/images/lunche/pizza1.jpg",
    title: "Pizza",
    titleEN: "Pizza",
    rows: 2,
    cols: 2,
  },
];
