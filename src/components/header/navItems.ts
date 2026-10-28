export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

// Only "eventos" has a page so far. The rest render as plain markers until their routes exist,
// so no link points to a 404.
export const navItems: NavItem[] = [
  { label: "nuestra historia" },
  { label: "reservas" },
  { label: "catering" },
  { label: "eventos", href: "/eventos" },
  { label: "menú" },
  { label: "tienda" },
  { label: "tarjetas de regalo" },
  { label: "prensa" },
  {
    label: "contacto",
    children: [
      { label: "horario y ubicación" },
      { label: "términos y condiciones" },
      { label: "suscríbete" },
    ],
  },
];
