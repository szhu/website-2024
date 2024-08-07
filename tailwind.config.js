/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      "2xs": "320px",
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
    },
    extend: {
      borderWidth: {
        1: "1px",
      },
      listStyleType: {
        bullet: `'• '`,
      },
      animation: {
        "fade-200": "fadeIn 200ms ease-in-out",
        "fade-500": "fadeIn 500ms ease-in-out",
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
