import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('/:filename')
  public async getFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const stream = await this.storageService.getFile(filename);
      // const { mime } = await fileTypeFromBuffer(buffer);
      res.set({
        'Content-Type': 'image/webp',
      });
      // res.sendFile(buffer.toString());

      stream.pipe(res);
    } catch (e) {
      return {
        error: {
          message: e.message,
        },
      };
    }
  }
}
