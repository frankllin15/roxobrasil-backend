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
import { AssetsService } from '../assets/assets.service';

import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly assetsService: AssetsService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadInput(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const payload = await this.uploadService.uploadFile(file);

      const assets = await this.assetsService.createAssets(payload);
      res.set({
        'Content-Type': 'application/json',
        // 'Content-Disposition': 'attachment',
      });

      res.json(assets);
    } catch (e) {
      res.status(400);

      res.json({
        error: {
          message: e.message,
        },
      });
    }
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
