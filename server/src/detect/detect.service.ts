import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import AWS from 'aws-sdk';
import path from 'path';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

@Injectable()
export class DetectService {
  client: ImageAnnotatorClient;
  s3: AWS.S3;

  constructor() {
    this.client = new vision.ImageAnnotatorClient({
      credentials: {
        client_email: process.env.client_email,
        private_key: process.env.private_key,
      },
    });

    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
  }

  async detectTextFromImage(file: Express.Multer.File) {
    try {
      // const [result] = await this.client.textDetection(file.buffer);
      // await this.uploadImage2S3(file);
      const result = await Promise.all([
        this.client.textDetection(file.buffer),
        this.uploadImage2S3(file),
      ]);
      console.log({ result });
      // const detections = result.textAnnotations;
      // console.log('Text:');
      // console.log(detections);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async uploadImage2S3(file: Express.Multer.File) {
    try {
      return await this.s3
        .putObject({
          Bucket: process.env.S3_BUCKET,
          Key: `images/${dayjs(Date.now()).format(
            'YYYYMMDD_HHmmssSSS',
          )}_${path.basename(file.originalname)}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        '이미지 업로드 중에 에러가 발생했습니다.',
      );
    }
  }
}
