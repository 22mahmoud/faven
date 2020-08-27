export const manifestJson = JSON.stringify(
  {
    name: 'faven-example',
    short_name: 'faven-example',
    description: 'Demo of faven',
    dir: 'auto',
    lang: 'en-US',
    display: 'standalone',
    orientation: 'any',
    start_url: '/',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: './favicon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        src: './favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: './favicon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: './favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: './favicon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: './favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: './favicon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: './favicon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: './favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  null,
  2
);

export const manifestWebapp = JSON.stringify(
  {
    version: '1.0.0',
    name: 'faven-example',
    description: 'Demo of faven',
    icons: {
      '60': './favicon-60x60.png',
      '128': './favicon-128x128.png',
      '512': './favicon-512x512.png',
    },
    developer: {
      name: null,
      url: null,
    },
  },
  null,
  2
);

export const yandexManifest = JSON.stringify(
  {
    version: '1.0.0',
    api_version: 1,
    layout: {
      logo: './favicon-50x50.png',
      color: '#fff',
      show_title: true,
    },
  },
  null,
  2
);

export const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="./favicon-70x70.png"/>
      <square150x150logo src="./favicon-150x150.png"/>
      <wide310x150logo src="./favicon-310x150.png"/>
      <square310x310logo src="./favicon-310x310.png"/>
      <TileColor>#fff</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
