export interface UploadPayload {
  source: string[];
}

export interface BufferWithInfo {
  buffer: Buffer;
  info: {
    filename: string;
  };
}
