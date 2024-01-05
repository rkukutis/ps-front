import Image from "image-js";

const NEW_IMAGE_HEIGHT = 250;

export default async function (file: File | null): Promise<string | null> {
  if (file === null) return null;
  const buffer: ArrayBuffer = await file.arrayBuffer();
  const image: Image = await Image.load(buffer);
  return image.resize({ height: NEW_IMAGE_HEIGHT, preserveAspectRatio: true }).toBase64();
}
