/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      listStyleType: {
        bullet: `'• '`,
      },
    },
  },
  plugins: [],
};
