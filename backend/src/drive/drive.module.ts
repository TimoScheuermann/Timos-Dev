import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { renameFile } from 'src/newsroom/utils/file-rename.util';
import { imageFileFilter } from 'src/newsroom/utils/file-upload.util';
import { DriveController } from './drive.controller';
import { DriveService } from './drive.service';
import { DriveItem, DriveItemSchema } from './schemas/DriveItem.schema';

@Module({
  controllers: [DriveController],
  providers: [DriveService],
  imports: [
    MulterModule.register({
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './uploads/drive',
        filename: renameFile,
      }),
    }),
    MongooseModule.forFeature([
      { name: DriveItem.name, schema: DriveItemSchema },
    ]),
  ],
})
export class DriveModule {}
