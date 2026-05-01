import { memoize } from "@/shared/utils";

export const baseColors = {
  black: "bg-black ring-black dark:bg-stone-900 dark:ring-stone-900",
  gray: "bg-gray-400 ring-gray-400 dark:bg-gray-700 dark:ring-gray-700",
  blue: "bg-blue-600 ring-blue-600 dark:bg-blue-900 dark:ring-blue-900",
  green: "bg-green-600 ring-green-600 dark:bg-green-900 dark:ring-green-900",
  red: "bg-red-600 ring-red-600 dark:bg-red-900 dark:ring-red-900",
  purple: "bg-purple-500 ring-purple-500 dark:bg-purple-900 dark:ring-purple-900",
  fuchsia: "bg-fuchsia-600 ring-fuchsia-600 dark:bg-fuchsia-900 dark:ring-fuchsia-900",
  rose: "bg-rose-300 ring-rose-300 dark:bg-rose-600 dark:ring-rose-600",
};

export const colors = {
  gray: "bg-gray-200 text-gray-600 ring-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:ring-gray-700",
  black: "text-white bg-black ring-black dark:bg-stone-900 dark:ring-stone-900 dark:text-stone-200",
  blue: "bg-blue-200 text-blue-600 ring-blue-200 dark:text-blue-200 dark:bg-blue-900 dark:ring-blue-900",
  green: "bg-green-200 text-green-600 ring-green-200 dark:text-green-200 dark:bg-green-900 dark:ring-green-900",
  red: "bg-red-200 text-red-600 ring-red-200 dark:text-red-200 dark:bg-red-900 dark:ring-red-900",
  purple: "bg-purple-200 text-purple-600 ring-purple-200 dark:text-purple-200 dark:bg-purple-900 dark:ring-purple-900",
  fuchsia:
    "bg-fuchsia-200 text-fuchsia-600 ring-fuchsia-200 dark:text-fuchsia-200 dark:bg-fuchsia-900 dark:ring-fuchsia-900",
  rose: "bg-rose-200 text-rose-600 ring-rose-200 dark:text-rose-200 dark:bg-rose-600 dark:ring-rose-600",
};

export type Color = keyof typeof colors;

export const getColor = memoize((color: Color) => colors[color]);
