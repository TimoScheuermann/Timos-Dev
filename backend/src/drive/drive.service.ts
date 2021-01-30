import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import { isValidObjectId, Model } from 'mongoose';
import { IDriveItem } from './interfaces/IDriveItem.interface';
import { IUploadedFile } from './interfaces/IUploadedFile.interface';
import { DriveItem } from './schemas/DriveItem.schema';

@Injectable()
export class DriveService {
  constructor(
    @InjectModel(DriveItem.name) private driveItemModel: Model<DriveItem>,
  ) {}

  public async getItems(): Promise<IDriveItem[]> {
    const items = await this.driveItemModel.find();
    return items.map((x) => {
      return {
        _id: x._id,
        created: x.created,
        filename: 'https://api.timos.design:3002/drive/file/' + x.filename,
        originalname: x.originalname,
      } as IDriveItem;
    });
  }

  public async uploadFiles(files: IUploadedFile[]): Promise<IDriveItem[]> {
    const items = await Promise.all(
      files.map(async (f) => {
        const item = await this.driveItemModel.create({
          filename: f.filename,
          created: new Date().getTime(),
          originalname: f.originalname,
        });
        return {
          _id: item._id,
          created: item.created,
          filename: 'https://api.timos.design:3002/drive/file/' + item.filename,
          originalname: item.originalname,
        } as IDriveItem;
      }),
    );
    return items;
  }

  public async deleteItem(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      return;
    }
    const driveItem = await this.driveItemModel.findOne({ _id: id });
    if (!driveItem) {
      return;
    }
    this.deleteFile(driveItem.filename);
    await this.driveItemModel.deleteOne({ _id: id });
  }

  private deleteFile(filename: string) {
    unlink('./uploads/drive/' + filename, (error) => {
      if (error && error.code == 'ENOENT') {
        console.info("[Drive]\tFile doesn't exsit, won't remove it");
      } else if (error) {
        console.error(
          '[Drive]\tError occurred while trying to remove file',
          error,
        );
      } else {
        console.info('[Drive]\tFile removed');
      }
    });
  }
}
