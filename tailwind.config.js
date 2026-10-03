/** Mesma configuração que ficava embutida no index.html com o CDN. */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  darkMode: "class",
  theme: { extend: { fontFamily: { sans: ["IBM Plex Sans", "sans-serif"] } } },
  plugins: [],
};
