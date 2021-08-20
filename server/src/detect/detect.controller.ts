import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DetectService } from './detect.service';

@Controller('detect')
export class DetectController {
  constructor(private readonly detectService: DetectService) {}
  /**
   * 이미지를 받아서 텍스트를 감지해 리턴
   */
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async detectTextFromImage(@UploadedFile() file: Express.Multer.File) {
    return this.detectService.detectTextFromImage(file);
  }

  @Post('parse')
  async parseText() {}
}
