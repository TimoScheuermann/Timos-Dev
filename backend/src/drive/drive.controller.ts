import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { GroupsGuard, TGroups } from 'src/auth/guards/TGroup.guard';
import { DriveService } from './drive.service';
import { IDriveItem } from './interfaces/IDriveItem.interface';
import { IUploadedFile } from './interfaces/IUploadedFile.interface';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @UseInterceptors(FilesInterceptor('files[]'))
  @Put()
  async uploadFiles(
    @UploadedFiles() files: IUploadedFile[],
  ): Promise<IDriveItem[]> {
    return this.driveService.uploadFiles(files);
  }

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @UseInterceptors(FilesInterceptor('files[]'))
  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    this.driveService.deleteItem(id);
  }

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @UseInterceptors(FilesInterceptor('files[]'))
  @Get('files')
  async getFiles(): Promise<IDriveItem[]> {
    return this.driveService.getItems();
  }

  @Get('file/:image')
  getUploadedThumbnail(
    @Param('image') image: string,
    @Res() res: Response,
  ): void {
    res.sendFile(image, { root: './uploads/drive' });
  }
}
