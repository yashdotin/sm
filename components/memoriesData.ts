export type Memory = {
  id: string;
  image: string;
  type?: "photo" | "video";
};

export const memories: Memory[] = [
  {
    id: "1",
    image: "/photos/photo1.jpeg",
    type: "photo"
  },
  {
    id: "2",
    image: "/photos/photo2.jpeg",
    type: "photo"
  },
  {
    id: "3",
    image: "/photos/photo3.jpeg",
    type: "photo"
  },
  {
    id: "4",
    image: "/photos/photo4.jpeg",
    type: "photo"
  },
  {
    id: "5",
    image: "/video.mp4",
    type: "video"
  }
];
