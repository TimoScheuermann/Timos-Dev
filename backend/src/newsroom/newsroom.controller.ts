import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { IProjectNewsroom } from 'src/project/interfaces/IProjectNewsroom.interface';
import { CreateNewsDTO } from './dtos/CreateNews.dto';
import { INewsExtended } from './interfaces/INewsExtended.interface';
import { IUploadedFile } from './interfaces/IUploadedFile.interface';
import { NewsroomService } from './newsroom.service';

@Controller('newsroom')
export class NewsroomController {
  constructor(private readonly newsroomService: NewsroomService) {}

  @Get('')
  async getNews(): Promise<INewsExtended[]> {
    return this.newsroomService.getNews();
  }

  @Get('projects')
  async getProjectsNewsroom(): Promise<IProjectNewsroom[]> {
    return this.newsroomService.getAvailableProjects();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createNews(
    @UploadedFile() thumbnail: IUploadedFile,
    @Body() createNewsDTO: CreateNewsDTO,
  ): Promise<string> {
    return this.newsroomService.createNews(createNewsDTO, thumbnail);
  }

  @Get('thumbnail/:image')
  getUploadedThumbnail(
    @Param('image') image: string,
    @Res() res: Response,
  ): void {
    res.sendFile(image, { root: './uploads/newsroom' });
  }
}
