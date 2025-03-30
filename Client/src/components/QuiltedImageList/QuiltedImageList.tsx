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
          <LazyImage {...srcset(item.img, 121, item.rows, item.cols)}>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "auto",
                paddingBlock: "8px",
                background: "rgba(0,0,0, 0.5 )",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  marginInline: "12%",
                  borderBottom: "1px solid #FFF",
                }}
              >
                {item.title}
              </p>
              <p style={{ color: "#fff", marginInline: "12%" }}>
                {item.titleEN}
              </p>
            </div>
          </LazyImage>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/lunche/filete de pescado apanado.webp",
    title: "Filete de pescado apanado",
    titleEN: "Breadded fish fillet",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/lunche/nuggets de pollo.webp",
    title: "Nuggets de pollo",
    titleEN: "Chicken nuggets",
    cols: 2,
    rows: 4,
  },
  {
    img: "/images/lunche/pasta boloñesa.webp",
    title: "Pasta boloñesa",
    titleEN: "Bolonese pasta",
    rows: 4,
    cols: 2,
  },
  {
    img: "/images/lunche/pasta vegetariana.webp",
    title: "Pasta vegetariana",
    titleEN: "Vegetarian pasta",
    rows: 4,
    cols: 2,
  },

  {
    img: "/images/lunche/pescado frito.webp",
    title: "Pescado frito",
    titleEN: "Fried fish",
    rows: 4,
    cols: 2,
  },
  {
    img: "/images/lunche/risoto.webp",
    title: "Risoto",
    titleEN: "Risoto",
    rows: 3,
    cols: 2,
  },
  {
    img: "/images/lunche/pechuga a la plancha.webp",
    title: "pechuga a la plancha",
    titleEN: "Grilled chicken breast",
    rows: 3,
    cols: 2,
  },
  {
    img: "/images/lunche/pizza1.webp",
    title: "Pizza",
    titleEN: "Pizza",
    rows: 2,
    cols: 2,
  },
];
