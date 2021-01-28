import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import { isValidObjectId, Model } from 'mongoose';
import { IProject } from 'src/project/interfaces/IProject.interface';
import { IProjectNewsroom } from 'src/project/interfaces/IProjectNewsroom.interface';
import { Project } from 'src/project/schemas/Project.schema';
import { CreateNewsDTO } from './dtos/CreateNews.dto';
import { UpdateNewsDTO } from './dtos/UpdateNews.dto';
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
  ): Promise<INewsExtended> {
    if (!thumbnail) {
      throw new UnprocessableEntityException('thumbnail missing');
    }
    const { content, project, timestamp, title, type } = createNewsDTO;
    if (!content) {
      this.deleteThumbnail(thumbnail.filename);
      throw new UnprocessableEntityException('content missing');
    }
    if (!project) {
      this.deleteThumbnail(thumbnail.filename);
      throw new UnprocessableEntityException('project missing');
    }
    if (!timestamp) {
      this.deleteThumbnail(thumbnail.filename);
      throw new UnprocessableEntityException('timestamp missing');
    }
    if (!title) {
      this.deleteThumbnail(thumbnail.filename);
      throw new UnprocessableEntityException('title missing');
    }
    if (!type) {
      this.deleteThumbnail(thumbnail.filename);
      throw new UnprocessableEntityException('type missing');
    }
    createNewsDTO.timestamp = +createNewsDTO.timestamp;

    const news = await this.newsModel.create({
      ...createNewsDTO,
      thumbnail: thumbnail.filename,
    });
    return (await this.mapNews([news]))[0];
  }

  public async deleteNews(id: string): Promise<void> {
    if (isValidObjectId(id)) {
      const news = await this.newsModel.findOne({ _id: id });
      if (news) {
        this.deleteThumbnail(news.thumbnail);
        await this.newsModel.deleteOne({ _id: id });
      }
    }
  }

  public async addFeatured(
    id: string,
    featured: IUploadedFile,
  ): Promise<INewsExtended> {
    if (!id || id.length === 0 || !isValidObjectId(id)) {
      throw new UnprocessableEntityException('incorrect id');
    }
    const oldNews = await this.newsModel.findOne({ _id: id });
    if (featured && oldNews) {
      this.deleteThumbnail(oldNews.featured);
      await this.newsModel.updateOne(
        { _id: id },
        { $set: { featured: featured.filename } },
      );
    }

    const news = await this.newsModel.findOne({ _id: id });
    return (await this.mapNews([news]))[0];
  }

  public async removeFeatured(id: string): Promise<INewsExtended> {
    if (!isValidObjectId(id)) {
      throw new UnprocessableEntityException('incorrect id');
    }
    const news = await this.newsModel.findOne({ _id: id });
    if (news && news.featured) {
      this.deleteThumbnail(news.featured);
    }
    await news.updateOne({ $unset: { featured: 1 } });

    return (await this.mapNews([news]))[0];
  }

  public async updateNews(
    updateNewsDTO: UpdateNewsDTO,
    thumbnail: IUploadedFile,
  ): Promise<INewsExtended> {
    const { _id } = updateNewsDTO;

    if (!_id || _id.length === 0 || !isValidObjectId(_id)) {
      throw new UnprocessableEntityException('incorrect id');
    }
    const oldNews = await this.newsModel.findOne({ _id: _id });
    if (thumbnail) {
      updateNewsDTO.thumbnail = thumbnail.filename;
      this.deleteThumbnail(oldNews.thumbnail);
    }

    await this.newsModel.updateOne({ _id: _id }, { $set: updateNewsDTO });

    const news = await this.newsModel.findOne({ _id: _id });

    return (await this.mapNews([news]))[0];
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

  public async getNews(
    limit: number | null = 100000,
    project: string | null = null,
    skip: number | null = 0,
  ): Promise<INewsExtended[]> {
    let news: News[] = [];
    let projectFilter = null;

    if (project) {
      if (!isValidObjectId(project)) {
        const reg = new RegExp(`${project}`, 'i');
        const projectObj = await this.projectModel.findOne({ title: reg });

        if (!projectObj) return [];
        else project = projectObj._id;
      }
      projectFilter = { project: project };
    }
    news = await this.newsModel
      .find(projectFilter)
      .sort({ timestamp: 1 })
      .skip(skip)
      .limit(limit)
      .sort({ timestamp: -1 });

    return await this.mapNews(news);
  }

  public async getRelevantProjects(): Promise<string[]> {
    const projectIds = await this.newsModel
      .aggregate([{ $sortByCount: '$project' }])
      .sort({ count: -1 });
    return Promise.all(
      projectIds.map(async (x) => {
        return (await this.projectModel.findOne({ _id: x._id })).title;
      }),
    );
  }

  private deleteThumbnail(filename: string) {
    unlink('./uploads/newsroom/' + filename, (error) => {
      if (error && error.code == 'ENOENT') {
        console.info("File doesn't exsit, won't remove it");
      } else if (error) {
        console.error('Error occurred while trying to remove file', error);
      } else {
        console.info('Old news-thumbnail removed');
      }
    });
  }

  private async mapNews(news: News[]): Promise<INewsExtended[]> {
    const projects: IProjectNewsroom[] = await this.getAvailableProjects();
    const projectlink = (id: string) =>
      projects.filter((x) => x._id + '' === id)[0];

    return news.map((x) => {
      return {
        content: x.content,
        project: projectlink(x.project),
        thumbnail:
          'https://api.timos.design:3002/newsroom/thumbnail/' + x.thumbnail,
        timestamp: x.timestamp,
        title: x.title,
        type: x.type,
        _id: x._id,
      } as INewsExtended;
    });
  }
}
