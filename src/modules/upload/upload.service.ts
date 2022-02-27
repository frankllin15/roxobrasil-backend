import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { ImageInfo, UploadPayload } from './upload.dto';
import { v4 as uuid } from 'uuid';
import { join } from 'path';

@Injectable()
export class UploadService {
  public async uploadFile(file: Express.Multer.File): Promise<UploadPayload> {
    const base64Blur = this.toBase64Blur(file, { width: 64 });
    const formatedImage = await this.processImage(file, 'webp', {
      width: 240,
    });

    const STORAGE_URI =
      process.env.STORAGE_URI ||
      `http://localhost:${process.env.PORT || 3000}/storage`;

    return {
      source: `${STORAGE_URI}/${formatedImage.filename}`,
      base64Url: await base64Blur,
      height: formatedImage.height,
      width: formatedImage.width,
      mime_type: formatedImage.mime_type,
    };
  }

  // Converte, redidimenciona e salva a imagem
  private async processImage(
    file: Express.Multer.File,
    filetype: keyof sharp.FormatEnum,
    resize: { width: number },
  ): Promise<ImageInfo> {
    const filename = `${uuid()}-w=${resize.width}.webp`;

    const { width, height, format } = await sharp(file.buffer)
      .toFormat(filetype)
      .resize(resize)
      .withMetadata()
      .toFile(join(process.cwd(), 'storage', filename));

    return {
      width,
      height,
      mime_type: `image/${format}`,
      filename,
    };
  }

  private async toBase64Blur(
    file: Express.Multer.File,
    resize: { width: number },
  ) {
    const base64 = await sharp(file.buffer).resize(resize).blur(12).toBuffer();
    // .toString();

    return `data:${file.mimetype};base64,${base64.toString('base64')}`;
  }

  // private saveFiles(files: BufferWithInfo[]) {
  //   files.map((file) => {
  //     createWriteStream(
  //       join(process.cwd(), 'storage', file.info.filename),
  //     ).write(file.buffer);
  //   });
  // }

  // private saveFile(file: BufferWithInfo) {
  //   createWriteStream(join(process.cwd(), 'storage', file.info.filename)).write(
  //     file.buffer,
  //   );
  // }
}
