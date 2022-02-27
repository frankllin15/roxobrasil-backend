import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class StorageService {
  public async getFile(filename: string) {
    const stream = createReadStream(join(process.cwd(), 'storage', filename));

    return stream;
  }
}
