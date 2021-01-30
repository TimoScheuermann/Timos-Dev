import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Project, ProjectSchema } from 'src/project/schemas/Project.schema';
import { NewsroomController } from './newsroom.controller';
import { NewsroomService } from './newsroom.service';
import { News, NewsSchema } from './schemas/News.schema';
import { renameFile } from './utils/file-rename.util';
import { imageFileFilter } from './utils/file-upload.util';

@Module({
  controllers: [NewsroomController],
  providers: [NewsroomService],
  imports: [
    MulterModule.register({
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './uploads/newsroom',
        filename: renameFile,
      }),
    }),
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
})
export class NewsroomModule {}
