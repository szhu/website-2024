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
      animation: {
        fade: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      screens: {
        // https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-56282
        "hover-supported": { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [],
};
