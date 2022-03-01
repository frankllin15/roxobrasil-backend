import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AssetsModule } from '../assets/assets.module';

@Module({
  providers: [UploadService],
  controllers: [UploadController],
  imports: [AssetsModule],
})
export class UploadModule {}
