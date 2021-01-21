import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProjectDTO } from './dtos/CreateProject.dto';
import { UpdateProjectDTO } from './dtos/UpdateProject.dto';
import { IProject } from './interfaces/IProject.interface';
import { Project } from './schemas/Project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  public async updateProject(
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<string> {
    const { _id } = updateProjectDTO;
    if (!isValidObjectId(_id)) {
      throw new UnprocessableEntityException('incorrect id');
    }

    await this.projectModel.updateOne({ _id: _id }, { $set: updateProjectDTO });

    return updateProjectDTO._id;
  }

  public async deleteProject(id: string): Promise<void> {
    if (isValidObjectId(id)) {
      await this.projectModel.updateOne(
        { _id: id },
        { $set: { visible: false } },
      );
    }
  }

  public async createProject(
    createProjectDTO: CreateProjectDTO,
  ): Promise<string> {
    const {
      description,
      hero,
      icon,
      thumbnail,
      title,
      tools,
    } = createProjectDTO;

    if (!description || description.length === 0) {
      throw new UnprocessableEntityException('description missing');
    }
    if (!hero || hero.length === 0) {
      throw new UnprocessableEntityException('hero missing');
    }
    if (!icon || icon.length === 0) {
      throw new UnprocessableEntityException('icon missing');
    }
    if (!thumbnail || thumbnail.length === 0) {
      throw new UnprocessableEntityException('thumbnail missing');
    }
    if (!title || title.length === 0) {
      throw new UnprocessableEntityException('title missing');
    }
    if (!tools) {
      throw new UnprocessableEntityException('tools missing');
    }

    const project = await this.projectModel.create({
      ...createProjectDTO,
      visible: true,
    });
    return project._id;
  }

  public async getProjects(): Promise<IProject[]> {
    const projects = await this.projectModel.find({ visible: true });
    return this.mapProjects(projects);
  }

  public async getAllProjects(): Promise<IProject[]> {
    const projects = await this.projectModel.find();
    return this.mapProjects(projects);
  }

  private mapProjects(projects: Project[]): IProject[] {
    return projects.map((x) => {
      return {
        description: x.description,
        displayOnHome: x.displayOnHome,
        hero: x.hero,
        icon: x.icon,
        thumbnail: x.thumbnail,
        title: x.title,
        tools: x.tools,
        _id: x._id,
        github: x.github,
        npmjs: x.npmjs,
        website: x.website,
      } as IProject;
    });
  }
}
