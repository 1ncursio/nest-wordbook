import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DetectController } from './detect.controller';
import { DetectService } from './detect.service';
import { MulterMemoryStorageService } from './multer-memory-storage.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterMemoryStorageService,
    }),
  ],
  controllers: [DetectController],
  providers: [DetectService],
})
export class DetectModule {}
