export interface UploadPayload {
  source: string;
  width: number;
  height: number;
  base64Url: string;
  mime_type: string;
}

export interface ImageInfo {
  filename: string;
  width: number;
  height: number;
  mime_type: string;
}
