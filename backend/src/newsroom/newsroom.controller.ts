import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  async getNews(
    @Query('limit') limit: number,
    @Query('project') project: string,
    @Query('skip') skip: number,
  ): Promise<INewsExtended[]> {
    return this.newsroomService.getNews(+limit, project, +skip);
  }

  @Get('projects')
  async getProjectsNewsroom(): Promise<IProjectNewsroom[]> {
    return this.newsroomService.getAvailableProjects();
  }

  @Get('projects/relevant')
  async getRelevantProjects(): Promise<string[]> {
    return this.newsroomService.getRelevantProjects();
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
  ): Promise<INewsExtended> {
    return this.newsroomService.createNews(createNewsDTO, thumbnail);
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Put()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async updateNews(
    @UploadedFile() thumbnail: IUploadedFile,
    @Body() updateNewsDTO: UpdateNewsDTO,
  ): Promise<INewsExtended> {
    return this.newsroomService.updateNews(updateNewsDTO, thumbnail);
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Put('featured/:id')
  @UseInterceptors(FileInterceptor('featured'))
  async addFeatured(
    @Param('id') id: string,
    @UploadedFile() featured: IUploadedFile,
  ): Promise<INewsExtended> {
    return this.newsroomService.addFeatured(id, featured);
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Delete('featured/:id')
  async removeFeatured(@Param('id') id: string): Promise<INewsExtended> {
    return this.newsroomService.removeFeatured(id);
  }

  @TGroups(['Admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Delete(':id')
  async deleteNews(@Param('id') id: string): Promise<void> {
    return this.newsroomService.deleteNews(id);
  }
}
