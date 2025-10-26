export const colors = {
  black: {
    text: "text-primary",
    bg: "bg-primary/80",
    base: "text-white bg-primary/90 ring-primary",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    base: "text-blue-100 bg-blue-600 ring-blue-600",
  },
  gray: {
    text: "text-gray-600",
    bg: "bg-gray-600",
    base: "text-gray-100 bg-gray-600 ring-gray-600",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-600",
    base: "text-green-100 bg-green-600 ring-green-600",
  },
  pink: {
    text: "text-pink-600",
    bg: "bg-pink-600",
    base: "text-pink-100 bg-pink-600 ring-pink-600",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-600",
    base: "text-purple-100 bg-purple-600 ring-purple-600",
  },
  red: {
    text: "text-red-600",
    bg: "bg-red-600",
    base: "text-red-100 bg-red-600 ring-red-600",
  },
  yellow: {
    text: "text-yellow-600",
    bg: "bg-yellow-600",
    base: "text-yellow-100 bg-yellow-600 ring-yellow-600",
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-600",
    base: "text-indigo-100 bg-indigo-600 ring-indigo-600",
  },
  fuchsia: {
    text: "text-fuchsia-600",
    bg: "bg-fuchsia-600",
    base: "text-fuchsia-100 bg-fuchsia-600 ring-fuchsia-600",
  },
};

export type Color = keyof typeof colors;

export const getColors = (color: string) => {
  return colors[color as Color];
};
