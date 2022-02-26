import { Controller, Get, Post, Res, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import sharp from 'sharp';
import { Readable } from 'stream';

@Controller('upload')
export class UploadController {
  @Post('/')
  async uploadInput(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    // console.log(file.filename);
    const out = await sharp(file.buffer).webp().toBuffer();
    res.set({
      'Content-Type': file.mimetype,
    });
    const stream = Readable.from(out);

    stream.pipe(res);
  }

  @Get('/')
  public upload() {
    return `
      <body>
        <form action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" id="file">
          <button type="submit">Upload</button>
        </from>
      </body>
    `;
  }
}
