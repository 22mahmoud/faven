import "alpinejs";
import JSZip from "jszip";
import Compressor from "compressorjs";
import marked from "marked";
import prism from "prismjs";

import manifest from "./assets/manifest.json";

const renderer = new marked.Renderer();

// use hljs to highlight our blaock of codes
renderer.code = (source, lang = "") => {
  const html = prism.highlight(source, prism.languages[lang], lang);
  return `<pre class='language-${lang}'><code>${html}</code></pre>`;
};

const md = `
\`\`\`html
<link rel="shortcut icon" href="./assets/favicon.ico" type="image/x-icon" />
<link rel="icon" href="./assets/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="app.css" />
<link rel="apple-touch-icon" sizes="57x57" href="./assets/apple-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="./assets/apple-icon-60x60.png"/> 
<link rel="apple-touch-icon" sizes="72x72" href="./assets/apple-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="./assets/apple-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="./assets/apple-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="./assets/apple-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="./assets/apple-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="./assets/apple-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="./assets/apple-icon-180x180.png" />
<link rel="icon" type="image/png" sizes="192x192" href="./assets/android-icon-192x192.png" />
<link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="./assets/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon-16x16.png" />
<link rel="manifest" href="./assets/manifest.json" />
<meta name="msapplication-TileColor" content="#48BB78" />
<meta name="msapplication-TileImage" content="./assets/ms-icon-144x144.png" />
<meta name="theme-color" content="#e2e8f0" />
\`\`\`
`;

async function compressImage(file, { width, height, name }) {
  return new Promise(
    (resolve, reject) =>
      new Compressor(file, {
        width,
        height,
        success(result) {
          resolve(
            new File([result], name, {
              type: result.type,
            })
          );
        },
        error(err) {
          reject(err);
        },
      })
  );
}

async function zipFiles(files) {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file);
  });

  zip.file(
    "manifest.json",
    new Blob([JSON.stringify(manifest, null, 2)], {
      type: "application/json",
    })
  );

  const outzip = await zip
    .generateAsync({ type: "blob" })
    .then(URL.createObjectURL);

  return outzip;
}

window.app = function () {
  return {
    href: "",
    filename: "",
    howToUse: marked(md, { renderer }),
    dragEnter: false,

    handleDragOver(e) {
      e.preventDefault();
      this.dragEnter = true;
    },

    handleDragLeave(e) {
      e.preventDefault();
      this.dragEnter = false;
    },

    handleOnDrop(e) {
      e.preventDefault();
      const { items } = e.dataTransfer;
      if (items.length > 1) return;

      const file = e.dataTransfer.items[0].getAsFile();

      if (!file.type.match(/image.*/)) return;

      this.generateFavicons(file);

      this.dragEnter = false;
    },

    async generateFavicons(file) {
      this.filename = file.name;

      const promises = [];
      for (const target of targets) {
        promises.push(
          compressImage(file, {
            width: target.size,
            height: target.size,
            name: target.name,
          })
        );
      }

      const images = await Promise.all(promises);
      this.href = await zipFiles(images);
    },

    async handleFileInputChange(e) {
      const file = e.target.files[0];

      if (!file) return;

      await this.generateFavicons(file);
    },
  };
};

const isProd = import.meta.env.MODE === "production";

if (isProd && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("sw.js is loaded");
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

const targets = [
  { size: 57, name: "apple-icon-57x57.png" },
  { size: 60, name: "apple-icon-60x60.png" },
  { size: 72, name: "apple-icon-72x72.png" },
  { size: 76, name: "apple-icon-76x76.png" },
  {
    size: 114,
    name: "apple-icon-114x114.png",
  },
  {
    size: 120,
    name: "apple-icon-120x120.png",
  },
  {
    size: 144,
    name: "apple-icon-144x144.png",
  },
  {
    size: 152,
    name: "apple-icon-152x152.png",
  },
  {
    size: 180,
    name: "apple-icon-180x180.png",
  },
  { size: 36, name: "android-icon-36x36.png" },
  { size: 48, name: "android-icon-48x48.png" },
  { size: 72, name: "android-icon-72x72.png" },
  { size: 96, name: "android-icon-96x96.png" },
  { size: 144, name: "android-icon-144x144.png" },
  { size: 192, name: "android-icon-192x192.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 96, name: "favicon-96x96.png" },
  { size: 16, name: "favicon-16x16.png" },
  { size: 16, name: "favicon.ico" },
  { size: 144, name: "ms-icon-144x144.png" },
];
