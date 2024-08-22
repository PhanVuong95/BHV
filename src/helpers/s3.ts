import config from "../contants/config";


export const getS3UploadUrl = (fileName: string) =>
  `${config.CLOUD_FRONT_HOST}/upload/${fileName}`;

export const getOrigin = (filePath = "") =>
  `${config.CLOUD_FRONT_HOST}/${filePath}`;

export const getCertPath = (fileName = "") => `upload/cert/${fileName}`;

export const getUploadImagePath = (fileName = "") =>
  `upload/images/${fileName}`;

export const getS3ImageUrl = (fileName: string) =>
  `${config.CLOUD_FRONT_HOST}/upload/images/${fileName}`;
