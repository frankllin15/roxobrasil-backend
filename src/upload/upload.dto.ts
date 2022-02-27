export interface UploadPayload {
  source: string;
  width: number;
  height: number;
  base64Url: string;
}

export interface ImageInfo {
  filename: string;
  width: number;
  height: number;
  mimetype: string;
}
