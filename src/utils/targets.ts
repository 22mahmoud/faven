interface Target {
  width: number;
  height: number;
  name: string;
}

export const getTargets = (): Target[] =>
  [
    { size: 16 },
    { size: 32 },
    { size: 36 },
    { size: 48 },
    { size: 50 },
    { size: 57 },
    { size: 60 },
    { size: 70 },
    { size: 72 },
    { size: 76 },
    { size: 96 },
    { size: 114 },
    { size: 120 },
    { size: 128 },
    { size: 144 },
    { size: 150 },
    { size: 152 },
    { size: 180 },
    { size: 192 },
    { size: 228 },
    { size: 256 },
    { size: 320 },
    { size: 384 },
    { size: 512 },
    { size: 1024 },
    { width: 310, height: 150 },
    { width: 310, height: 310 },
    { width: 320, height: 640 },
    { width: 640, height: 920 },
    { width: 640, height: 1069 },
    { width: 750, height: 1294 },
    { width: 1182, height: 2208 },
    { width: 1242, height: 2148 },
    { width: 748, height: 1024 },
    { width: 768, height: 1004 },
    { width: 1536, height: 2008 },
  ]
    .map((target) => {
      const height = target.height || target.size || 0;
      const width = target.width || target.size || 0;

      const name = `favicon-${width}x${height}.png`;

      return {
        width,
        height,
        name,
      };
    })
    .concat([{ name: 'favicon.ico', width: 16, height: 16 }]);
