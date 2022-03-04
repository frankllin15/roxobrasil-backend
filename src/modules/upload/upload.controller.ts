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
      if (payload instanceof Error) throw new Error(payload.message);

      const assets = await this.assetsService.createAssets(payload);
      res.set({
        'Content-Type': 'application/json',
      });

      return res.json(assets);
    } catch (e) {
      console.log('Caiu no catch');
      res.status(300);

      return res.json({
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
