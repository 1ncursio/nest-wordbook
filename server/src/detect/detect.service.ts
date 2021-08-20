import vision from '@google-cloud/vision';
import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import path from 'path';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.client_email,
    private_key: process.env.private_key,
  },
});

@Injectable()
export class DetectService {
  async detectTextFromImage(file: Express.Multer.File) {
    // file.
    console.log({ file });
    // const [result] = await client.textDetection(file.buffer);
    await this.uploadImage2S3(file);
    // const detections = result.textAnnotations;
    // console.log('Text:');
    // console.log(detections);
    return true;
  }

  async uploadImage2S3(file: Express.Multer.File) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });

    try {
      await s3
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
    }
  }
}
