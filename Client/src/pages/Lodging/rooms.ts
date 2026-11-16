export interface RoomImage {
  id: number;
  url: string;
  alt: string;
}

export interface Room {
  id: string;
  title: string;
  roomCount: number;
  maxCapacity: number;
  size: string;
  description: string;
  price: string;
  images: RoomImage[];
}

export const rooms: Room[] = [
  {
    id: "101",
    title: "Cabaña 101",
    roomCount: 1,
    maxCapacity: 2,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 892.500 COP",
    images: [
      {
        id: 1,
        url: "/images/Lodging/IMG_4318.webp",
        alt: "Vista principal de la villa",
      },
      {
        id: 2,
        url: "/images/Lodging/IMG_4319.webp",
        alt: "Habitación principal",
      },
    ],
  },
  {
    id: "102",
    title: "Cabaña 102",
    roomCount: 2,
    maxCapacity: 3,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 892.500 COP",
    images: [
      {
        id: 1,
        url: "/images/Lodging/IMG_4320.webp",
        alt: "Vista principal de la villa",
      },
      {
        id: 2,
        url: "/images/Lodging/IMG_4321.webp",
        alt: "Habitación principal",
      },
      {
        id: 3,
        url: "/images/Lodging/IMG_4322.webp",
        alt: "Baño de lujo",
      },
    ],
  },
  {
    id: "103",
    title: "Cabaña 103",
    roomCount: 1,
    maxCapacity: 2,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 892.500 COP",
    images: [
      {
        id: 1,
        url: "/images/Lodging/IMG_4315.webp",
        alt: "Vista principal de la villa",
      },
      {
        id: 2,
        url: "/images/Lodging/IMG_4316.webp",
        alt: "Habitación principal",
      },
      {
        id: 3,
        url: "/images/Lodging/IMG_4317.webp",
        alt: "Baño de lujo",
      },
    ],
  },
  {
    id: "104",
    title: "Cabaña 104",
    roomCount: 2,
    maxCapacity: 4,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 1.106.700 COP",
    images: [
      {
        id: 1,
        url: "/images/Lodging/IMG_4314.webp",
        alt: "Vista principal de la villa",
      },
    ],
  },

];
