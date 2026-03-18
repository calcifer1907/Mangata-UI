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
    id: "villa-superior-1",
    title: "VILLA SUPERIOR 1",
    roomCount: 1,
    maxCapacity: 2,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 1.800.000",
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
    id: "villa-superior-2",
    title: "VILLA SUPERIOR 2",
    roomCount: 2,
    maxCapacity: 3,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 1.800.000",
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
    id: "villa-superior-3",
    title: "VILLA SUPERIOR 3",
    roomCount: 1,
    maxCapacity: 2,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 1.800.000",
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
    id: "villa-superior-4",
    title: "VILLA SUPERIOR 4",
    roomCount: 2,
    maxCapacity: 4,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 1.800.000",
    images: [
      {
        id: 1,
        url: "/images/Lodging/IMG_4314.webp",
        alt: "Vista principal de la villa",
      },
    ],
  },
  {
    id: "villa-superior-5",
    title: "VILLA SUPERIOR 5",
    roomCount: 1,
    maxCapacity: 2,
    size: "90 M²",
    description:
      "En medio de la naturaleza disfrutará de una estancia lujosa, una villa superior con detalles extras pensados para aquellos que quieren celebrar...",
    price: "$ 1.800.000",
    images: [
      {
        id: 1,
        url: "/images/Lodging/IMG_4313.webp",
        alt: "Vista principal de la villa",
      },
    ],
  },
];
