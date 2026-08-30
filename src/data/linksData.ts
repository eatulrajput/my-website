interface linksDataProfile {
title?:string
description?:string
name?:string
links:Link[]
}

interface Link {
    name:string
    url:string
}


export const linksData:linksDataProfile[] = [
  {
    title: "Coding Profile",
    description:
      "Curated sites and tools to help spark creativity for UI/UX design.",
    links: [
      { name: "Leetcode", url: "https://leetcode.com/u/eatulrajput" },
      { name: "Codeforces", url: "https://codeforces.com/profile/eatulrajput" },
      { name: "Hackerrank", url: "https://hackerrank.com/profile/eatulrajput" },
      {
        name: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/user/eatulrajput/",
      },
    ],
  },
  {
    title: "Blogs",
    description:
      "Useful utilities and services to help you build better and faster.",
    links: [
      { name: "Hashnode", url: "https://eatulrajput.hashnode.dev" },
      { name: "Medium", url: "https://medium.com/@eatulrajput" },
    ],
  },
  {
    title: "Others",
    description: "",
    links: [
      { name: "Google Developer Profile", url: "https://g.dev/atulrajput" },
      {
        name: "LFX Profile",
        url: "https://openprofile.dev/profile/eatulrajput",
      },
      { name: "Orchid Profile", url: "https://orcid.org/0009-0009-5804-697X" },
      {
        name: "Google Skills",
        url: "https://www.skills.google/public_profiles/776126c0-4951-4ba5-87d0-77d3409f34a5",
      },
      { name: "Kaggle", url: "https://kaggle.com/eatulrajput" },
      {
        name: "Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/users/eatulrajput/",
      },
      { name: "Figma", url: "https://figma.com/@eatulrajput" },
      {
        name: "Spotify",
        url: "https://open.spotify.com/user/31souyosfw3y2ztotor422phlj3q",
      },
      { name: "MonkeyType", url: "https://monkeytype.com/profile/eatulrajput" },
      { name: "Devpost", url: "https://devpost.com/eatulrajput" },
      { name: "Chess.com", url: "https://www.chess.com/member/eatulrajput" },
    ],
  },
];