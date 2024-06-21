/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               fontSize: {
                    responsive: " font-size: clamp(1rem, 2vw + 1rem, 3rem);",
               },
          },
     },
     plugins: [require("@tailwindcss/typography")],
};
