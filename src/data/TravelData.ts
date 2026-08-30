export type Place = {
  id: string;
  name: string;
  description?: string;
  image: string;
};

export type Location = {
  id: string;
  country: string;
  state?: string;
  city?: string;
  coverImage: string;
  places: Place[];
};

export const travelData: Location[] = [
  {
    id: "loc-mumbai",
    country: "India",
    state: "Maharashtra",
    city: "",
    coverImage: "/travel/maharashtra/maharashtra.webp",
    places: [
      {
        id: "p1",
        name: "Shani Shingnapur",
        description: "A village in Maharashtra",
        image: "/travel/maharashtra/shani_shingnapur.webp",
      },
      {
        id: "p2",
        name: "Shirdi",
        description: "a town in the state of Maharashtra",
        image: "/travel/maharashtra/shirdi.webp",
      },
    ],
  },
  {
    id: "loc-bhubaneshwar",
    country: "India",
    state: "Odisha",
    city: "Bhubaneshwar",
    coverImage: "/travel/odisha/bhubaneshwar.webp",
    places: [
      {
        id: "p3",
        name: "Lingaraj Temple",
        description: "temple in Bhubaneshwar",
        image: "/travel/odisha/lingaraj_temple.webp",
      },
      {
        id: "p4",
        name: "Dhauli Shanti Stupa",
        description: "a stupa in Odisha",
        image: "/travel/odisha/dhauli.webp",
      },
    ],
  },
  {
    id: "loc-bengaluru",
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    coverImage: "/travel/karnataka/bangalore_palace.webp",
    places: [
      {
        id: "p5",
        name: "Bangalore Palace",
        description: "palace in Bengaluru",
        image: "/travel/karnataka/bangalore_palace.webp",
      },
    ],
  },
];
