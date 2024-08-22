import { QR_GEN_ID } from "../contants";
export function getBase64QRCode() {
  const image = document.getElementById(QR_GEN_ID) as HTMLImageElement;

  if (!image) return;
  const canvas = document.createElement("canvas");
  image.style.width = `${image.width}px`;
  image.style.height = `${image.height}px`;
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(image, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  return dataURL;
  console.log(
    image.clientHeight,
    image.clientWidth,
    image.width,
    image.height,
    { dataURL }
  );
  return dataURL.replace(/^data:image\/?[A-z]*;base64,/, "");
}
