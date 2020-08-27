module.exports = {
  mount: {
    src: '/',
  },
  clean: true,
  plugins: [
    [
      '@snowpack/plugin-run-script',
      { cmd: 'tsc --noEmit', watch: '$1 --watch' },
    ],

    [
      '@snowpack/plugin-build-script',
      { cmd: 'postcss', input: ['.css'], output: ['.css'] },
    ],
  ],
  installOptions: {
    installTypes: true,
    sourceMap: true,
  },
};
