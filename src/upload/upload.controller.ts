import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import sharp from 'sharp';
// import { UploadService } from './upload.service';

@Controller('/upload')
export class UploadController {
  // constructor(private uploadServices: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    // return file.buffer;
    console.log(file.mimetype);
    res.set({
      'Content-Type': file.mimetype,
      // 'Content-Disposition': `attachment; filename="${file.filename}"`,
    });
    const out = await sharp(file.buffer)
      .resize({ withoutEnlargement: true, width: 100 })
      .webp()
      .toBuffer();

    createWriteStream('out.webp').write(out);
    const stream = Readable.from(out);

    return stream.pipe(res);
  }

  @Get('/assets')
  get() {
    return `
      <body>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" />
          <button type="submit">Upload</button>
          </form>
      <body>
    `;
  }
}
