export const createEmptyProduct = () => ({
  name: "",
  model: "",
  category: "",
  brand: "",
  description: "",
  features: "",
  specifications: "",
  image: "",
  images: [],
  datasheetUrl: "",
  datasheetUrls: [""],
  featured: false,
  status: "available"
});

export const productCategories = [
  "NVR/DVR",
  "Analog Cameras",
  "Digital Cameras",
  "Network Routers",
  "Network Switches",
  "Network Access Points",
  "Wireless Bridge",
  "Network Cables",
  "Other Network Components"
];

export const productBrands = [
  "Ruijie | Reyee",
  "EATON fire alarm system",
  "unicable",
  "KNX",
  "DELL technologies",
  "Salto inspired access",
  "Eelectron",
  "Itc",
  "Schrack Seconet",
  "Fortinet",
  "Hikvision"
];
