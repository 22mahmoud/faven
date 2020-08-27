module.exports = {
  mount: {
    src: "/",
  },
  sourceMap: true,
  clean: true,
  plugins: [
    [
      "@snowpack/plugin-build-script",
      { cmd: "postcss", input: [".css"], output: [".css"] },
    ],
  ],
};
