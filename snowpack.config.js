module.exports = {
  sourceMap: true,
  clean: true,
  plugins: [
    [
      "@snowpack/plugin-build-script",
      { cmd: "postcss", input: [".css"], output: [".css"] },
    ],
  ],
};
