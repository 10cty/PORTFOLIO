/*
  ─────────────────────────────────────────────────────────────
  PROJECTS — edit this list to add, remove or reorder work.
  Both the home page ("Selected Work") and the Work page read
  from here, so you only ever change it in one place.

  To add a project:
    1. Put the video in  assets/video/  and a thumbnail image
       (16:9, ~1280px wide) in  assets/img/
    2. Copy one block below, paste it where you want it in the
       list, and change the details.
    3. Set  featured: true  to also show it on the home page.

  "tags" drive the filter buttons on the Work page.
  ─────────────────────────────────────────────────────────────
*/
window.PROJECTS = [
  {
    id: "mantle",
    title: "Mantle",
    subtitle: "Real World Assets · DeFi",
    client: "Mantle",
    type: "UGC",
    recognition: "Video contest entry",
    duration: "1:41",
    tags: ["Web3", "DeFi"],
    thumb: "assets/img/mantle.jpg",
    video: "assets/video/mantle.mp4",
    featured: true,
    about:
      "A storytelling visual that breaks down the technical idea of Real World Assets investment. The video walks through the three layers of how Mantle connects traditional finance and decentralised finance, using visual storytelling and motion."
  },
  {
    id: "busha",
    title: "Busha",
    subtitle: "Crypto-Backed Loans · Product Launch",
    client: "Busha",
    type: "UGC",
    recognition: "1 of 6 videos made for Busha",
    duration: "2:14",
    tags: ["Fintech", "Crypto"],
    thumb: "assets/img/busha.jpg",
    video: "assets/video/busha.mp4",
    featured: true,
    about:
      "A product feature launch introducing Busha's crypto-backed loans. A storytelling approach blended with motion design and quality colour grading."
  },
  {
    id: "codexero",
    title: "CodeXero",
    subtitle: "dApp Builder AI · Product Launch",
    client: "CodeXero",
    type: "UGC",
    award: "Contest winner",
    recognition: "Winner, CodeXero video contest",
    duration: "1:36",
    tags: ["Web3", "AI"],
    thumb: "assets/img/codexero.jpg",
    video: "assets/video/codexero.mp4",
    featured: true,
    about:
      "A cinematic product launch for the dApp Builder AI feature on CodeXero, built around relatability and strong storytelling."
  },
  {
    id: "busha2",
    title: "Busha",
    subtitle: "Crypto to Naira · Feature Explainer",
    client: "Busha",
    type: "UGC",
    recognition: "1 of 6 videos made for Busha",
    duration: "1:13",
    tags: ["Fintech", "Crypto"],
    thumb: "assets/img/busha2.jpg",
    video: "assets/video/busha2.mp4",
    featured: true,
    about:
      "A cinematic feature explainer for converting crypto to Naira on Busha, with clean, premium edits, colour grading and considered motion design."
  }
];

/*
  BRANDS — the "Brands I've created for" strip on the home page.
  Logos are white on transparent (assets/img/brands/). "label: true"
  prints the name next to logos that are only an icon.
*/
window.BRANDS = [
  { name: "Busha",    logo: "assets/img/brands/busha.png",    h: 28 },
  { name: "Spenda",   logo: "assets/img/brands/spenda.png",   h: 28 },
  { name: "Mantle",   logo: "assets/img/brands/mantle.png",   h: 34 },
  { name: "Jupiter",  logo: "assets/img/brands/jupiter.png",  h: 34, label: true },
  { name: "CodeXero", logo: "assets/img/brands/codexero.png", h: 34, label: true }
];

/*
  HIGHLIGHTS — the track-record list in the About section.
*/
window.HIGHLIGHTS = [
  { big: "$1,000", text: "Winner, Jupiter video contest" },
  { big: "1st",    text: "Winner, CodeXero video contest" },
  { big: "6",      text: "Videos produced for Busha" },
  { big: "5",      text: "UGC videos for Spenda" }
];
