import "alpinejs";
import marked from "marked";
import prism from "prismjs";

import { md } from "./utils/how-to-use";
import { getTargets } from "./utils/targets";
import {
  yandexManifest,
  browserconfig,
  manifestJson,
  manifestWebapp,
} from "./utils/configFiles";
import { compressImage } from "./utils/compressImage";
import { zipFiles } from "./utils/zipFiles";

const renderer = new marked.Renderer();

renderer.code = (source, lang = "") => {
  const html = prism.highlight(source, prism.languages[lang], lang);
  return `<pre class='language-${lang}'><code>${html}</code></pre>`;
};

window.app = function () {
  return {
    href: "",
    filename: "",
    loading: false,
    howToUse: marked(md, { renderer }),
    dragEnter: false,

    handleDragOver(e: DragEvent) {
      e.preventDefault();
      this.dragEnter = true;
    },

    handleDragLeave(e: DragEvent) {
      e.preventDefault();
      this.dragEnter = false;
    },

    handleOnDrop(e: DragEvent) {
      e.preventDefault();
      const items = e.dataTransfer?.items ?? [];

      if (items.length > 1) return;

      const file = items[0].getAsFile();

      if (!file || !file.type.match(/image.*/)) return;

      this.generateFavicons(file);

      this.dragEnter = false;
    },

    async generateFavicons(file: File) {
      this.href = "";
      this.loading = true;
      this.filename = file.name;

      const promises = [];
      const targets = getTargets();
      for (const { height, width, name } of targets) {
        promises.push(
          compressImage(file, {
            height,
            width,
            name,
          })
        );
      }

      const images = await Promise.all(promises);
      this.href = await zipFiles(images, [
        {
          name: "manifest.json",
          content: manifestJson,
          type: "application/json",
        },
        {
          name: "manifest.webapp",
          content: manifestWebapp,
          type: "text/webapp",
        },
        {
          name: "yandex-browser-manifest.json",
          content: yandexManifest,
          type: "application/json",
        },
        {
          name: "browserconfig.xml",
          content: browserconfig,
          type: "text/xml",
        },
      ]);

      this.loading = false;
    },

    async handleFileInputChange(e: Event) {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

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
