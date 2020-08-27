import JSZip from 'jszip';

interface ConfigFile {
  content: string;
  type: string;
  name: string;
}

export async function zipFiles(
  images: File[],
  files: ConfigFile[]
): Promise<string> {
  const zip = new JSZip();

  images.forEach((image) => {
    zip.file(image.name, image);
  });

  files.forEach((file) => {
    zip.file(
      file.name,
      new Blob([file.content], {
        type: file.type,
      })
    );
  });

  const outzip = await zip.generateAsync({ type: 'blob' });

  return URL.createObjectURL(outzip);
}
