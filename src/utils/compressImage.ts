import Compressor from "compressorjs";

interface CompressImageOptins {
  width: number;
  height: number;
  name: string;
}

export async function compressImage(
  file: File,
  { width, height, name }: CompressImageOptins
): Promise<File> {
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
