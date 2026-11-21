import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahmed Ahmed | Molecular Bioengineering Portfolio",
    short_name: "Ahmed Ahmed",
    description:
      "First Class MEng Molecular Bioengineering undergraduate at Imperial College London. Nanopore sequencing, diagnostic bioassays, and embedded bioinstrumentation.",
    start_url: "/portfolio/",
    display: "standalone",
    background_color: "#070c14",
    theme_color: "#11b5c9",
    icons: [
      {
        src: "/portfolio/favicon.ico",
        sizes: "64x64",
        type: "image/png",
      },
    ],
    categories: ["bioengineering", "bioinformatics", "portfolio", "science"],
    lang: "en-GB",
    dir: "ltr",
    scope: "/portfolio/",
  };
}
