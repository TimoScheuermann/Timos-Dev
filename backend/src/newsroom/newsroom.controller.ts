import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { GroupsGuard, TGroups } from 'src/auth/guards/TGroup.guard';
import { IProjectNewsroom } from 'src/project/interfaces/IProjectNewsroom.interface';
import { CreateNewsDTO } from './dtos/CreateNews.dto';
import { UpdateNewsDTO } from './dtos/UpdateNews.dto';
import { INewsExtended } from './interfaces/INewsExtended.interface';
import { IUploadedFile } from './interfaces/IUploadedFile.interface';
import { NewsroomService } from './newsroom.service';

@Controller('newsroom')
export class NewsroomController {
  constructor(private readonly newsroomService: NewsroomService) {}

  @Get('')
  async getNews(@Param('limit') limit: number): Promise<INewsExtended[]> {
    return this.newsroomService.getNews(limit);
  }

  @Get('projects')
  async getProjectsNewsroom(): Promise<IProjectNewsroom[]> {
    return this.newsroomService.getAvailableProjects();
  }

  @Get('thumbnail/:image')
  getUploadedThumbnail(
    @Param('image') image: string,
    @Res() res: Response,
  ): void {
    res.sendFile(image, { root: './uploads/newsroom' });
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createNews(
    @UploadedFile() thumbnail: IUploadedFile,
    @Body() createNewsDTO: CreateNewsDTO,
  ): Promise<string> {
    return this.newsroomService.createNews(createNewsDTO, thumbnail);
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Put()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async updateNews(
    @UploadedFile() thumbnail: IUploadedFile,
    @Body() updateNewsDTO: UpdateNewsDTO,
  ): Promise<string> {
    return this.newsroomService.updateNews(updateNewsDTO, thumbnail);
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Delete(':id')
  async deleteNews(@Param('id') id: string): Promise<void> {
    return this.newsroomService.deleteNews(id);
  }
}
