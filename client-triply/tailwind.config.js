/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2A6F97",
                secondary: "#61A5C2",
                sand: "#E9D8A6",
                coral: "#EE6C4D",
                snow: "#F7F9FB",
            },
        },
    },
    plugins: [],
}
