import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { rm } from 'fs/promises';
import { isValidObjectId, Model } from 'mongoose';
import { IProject } from 'src/project/interfaces/IProject.interface';
import { IProjectNewsroom } from 'src/project/interfaces/IProjectNewsroom.interface';
import { Project } from 'src/project/schemas/Project.schema';
import { CreateNewsDTO } from './dtos/CreateNews.dto';
import { UpdateNewsDTO } from './dtos/UpdateNews.dto';
import { INews } from './interfaces/INews.interface';
import { INewsExtended } from './interfaces/INewsExtended.interface';
import { IUploadedFile } from './interfaces/IUploadedFile.interface';
import { News } from './schemas/News.schema';

@Injectable()
export class NewsroomService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(News.name) private newsModel: Model<News>,
  ) {}

  public async createNews(
    createNewsDTO: CreateNewsDTO,
    thumbnail: IUploadedFile,
  ): Promise<string> {
    if (!thumbnail) {
      throw new UnprocessableEntityException('thumbnail missing');
    }
    const { content, project, timestamp, title, type } = createNewsDTO;
    if (!content) {
      throw new UnprocessableEntityException('content missing');
    }
    if (!project) {
      throw new UnprocessableEntityException('project missing');
    }
    if (!timestamp) {
      throw new UnprocessableEntityException('timestamp missing');
    }
    if (!title) {
      throw new UnprocessableEntityException('title missing');
    }
    if (!type) {
      throw new UnprocessableEntityException('type missing');
    }

    const news = await this.newsModel.create({
      content: content,
      project: project,
      timestamp: timestamp,
      title: title,
      type: type,
      thumbnail: thumbnail.filename,
    });
    return news._id;
  }

  public async deleteNews(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      await this.newsModel.deleteOne({ _id: id });
    }
  }

  public async updateNews(
    updateNewsDTO: UpdateNewsDTO,
    thumbnail: IUploadedFile,
  ): Promise<string> {
    const { _id } = updateNewsDTO;
    if (!isValidObjectId(_id)) {
      throw new UnprocessableEntityException('incorrect id');
    }
    const oldNews = await this.newsModel.findOne({ _id: _id });
    if (thumbnail) {
      updateNewsDTO.thumbnail = thumbnail.filename;
      rm('./uploads/newsroom/' + oldNews.thumbnail);
    }
    await this.newsModel.updateOne({ _id: _id }, { $set: updateNewsDTO });

    return oldNews._id;
  }

  public async getAvailableProjects(): Promise<IProjectNewsroom[]> {
    const projects: IProject[] = await this.projectModel.find({
      website: { $exists: true },
    });
    return projects.map((x) => {
      return {
        _id: x._id,
        icon: x.icon,
        title: x.title,
        website: x.website,
      } as IProjectNewsroom;
    });
  }

  public async getNews(limit: number): Promise<INewsExtended[]> {
    const projects: IProjectNewsroom[] = await this.getAvailableProjects();
    let news: INews[] = await this.newsModel.find().sort({ timestamp: 1 });
    if (limit) news = news.slice(0, limit);

    const projectlink = (id: string) => {
      return projects.filter((x) => x._id === id)[0];
    };

    return news.map((x) => {
      return {
        content: x.content,
        project: projectlink(x._id),
        thumbnail: x.thumbnail,
        timestamp: x.timestamp,
        title: x.title,
        type: x.type,
        _id: x._id,
      } as INewsExtended;
    });
  }
}
