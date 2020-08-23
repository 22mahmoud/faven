import "alpinejs";
import JSZip from "jszip";
import Compressor from "compressorjs";

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

  const outzip = await zip
    .generateAsync({ type: "blob" })
    .then(URL.createObjectURL);

  return outzip;
}

window.app = function () {
  return {
    href: "",
    filename: "",

    async handleFileInputChange(e) {
      const file = e.target.files[0];

      if (!file) return;

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
  };
};

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
  { size: 192, name: "android-icon-192x192.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 96, name: "favicon-96x96.png" },
  { size: 16, name: "favicon-16x16.png" },
  { size: 144, name: "ms-icon-144x144.png" },
];
