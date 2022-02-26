import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { BufferWithInfo, UploadPayload } from './upload.dto';
import { v4 as uuid } from 'uuid';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  public async uploadFile(file: Express.Multer.File): Promise<UploadPayload> {
    const formatedImage = await Promise.all([
      this.convertFile(file.buffer, 'webp', { width: 720 }),
      this.convertFile(file.buffer, 'webp', { width: 240 }),
    ]);

    formatedImage.map((e) => {
      e.info.filename = `${uuid()}-w=${e.info.width}.webp`;
    });

    this.saveFiles(formatedImage);

    return { source: formatedImage.map((e) => e.info.filename) };
  }

  private async convertFile(
    file: Buffer,
    filetype: keyof sharp.FormatEnum,
    resize: { width: number },
  ) {
    const buffer = await sharp(file)
      .toFormat(filetype)
      .resize(resize)
      .toBuffer();
    return {
      buffer,
      info: { width: resize.width, filename: '' },
    };
  }

  private saveFiles(files: BufferWithInfo[]) {
    files.map((file) => {
      createWriteStream(
        join(process.cwd(), 'storage', file.info.filename),
      ).write(file.buffer);
    });
  }
}
