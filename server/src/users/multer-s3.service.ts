import { BadRequestException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import AWS from 'aws-sdk';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import multerS3 from 'multer-s3';
import path from 'path';

dayjs.locale('ko');

export class MulterS3Service implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3({
        bucket: process.env.S3_BUCKET,
        s3: new AWS.S3({
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
          cb(
            null,
            `images/${dayjs(Date.now()).format(
              'YYYYMMDD_HHmmssSSS',
            )}_${path.basename(file.originalname)}`,
          );
        },
      }),
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
