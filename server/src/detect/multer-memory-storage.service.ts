import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import multer from 'multer';

@Injectable()
export class MulterMemoryStorageService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter(req, file, cb) {
        const mimetypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (mimetypes.includes(file.mimetype)) {
          return cb(null, true);
        }

        cb(new BadRequestException('이미지만 업로드 가능합니다.'), false);
      },
    };
  }
}
