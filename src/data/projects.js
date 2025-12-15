// src/data/projects.js
export const projects = [
  {
    id: 1,
    title: "Coca Cola",
    description: "Diseño web corporativo",
    image: "/img/index/cocacola.webp",
    category: "web",
    previewUrl: "/previews/cocacola.html", // 🔹 nuevo campo
  },
  {
    id: 2,
    title: "Sistema de reserva de restaurante",
    description: "E-commerce especializado",
    image: "/img/index/reservacion.webp",
    category: "web",
    previewUrl: "/previews/restaurante.html", // 🔹 nuevo campo
  },
  {
    id: 3,
    title: "Lux Bolivia",
    description: "Portal de lujo",
    image: "/img/index/Lux-Bolivia.webp",
    category: "corporativo",
    previewUrl: "/previews/luxbolivia.html", // 🔹 nuevo campo
  },
  {
    id: 4,
    title: "Sistema Inventario-Supermarket",
    description: "Desarrollo de inventario",
    image: "/img/index/Inventario-Supermarket.webp",
    category: "corporativo",
    previewUrl: "/previews/inventario.html", // 🔹 nuevo campo
  },
  {
    id: 5,
    title: "Sistemas de ventas",
    description: "E-commerce especializado",
    image: "/img/index/sistemasventas.webp",
    category: "web",
    // sin previewUrl → mostrará fallback en el modal
  },
];
