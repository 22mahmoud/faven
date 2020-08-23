const postcssImport = require("postcss-import");
const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const tailwindcss = require("tailwindcss");

const tailwindcssConfig = require("./tailwind.config");

const production = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    postcssImport(),

    autoprefixer(),

    tailwindcss(tailwindcssConfig),

    production &&
      purgecss({
        content: [`${__dirname}/**/*.html`],
        defaultExtractor: (content) => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches =
            content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
      }),

    production &&
      cssnano({
        preset: ["default", { discardComments: { removeAll: true } }],
      }),
  ].filter(Boolean),

  sourceMap: true,
};
