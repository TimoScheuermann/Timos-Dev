import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupsGuard, TGroups } from 'src/auth/guards/TGroup.guard';
import { CreateVMComponentDTO } from './dtos/CreateVMComponent.dto';
import { CreateVMPropDTO } from './dtos/CreateVMProp.dto';
import { UpdateVMComponentDTO } from './dtos/UpdateVMComponent.dto';
import { UpdateVMPropDTO } from './dtos/UpdateVMProp.dto';
import { VMComponent } from './schemas/VMComponent.schema';
import { VMProp } from './schemas/VMProp.schema';
import { VuementService } from './vuement.service';

@Controller('vuement')
export class VuementController {
  constructor(private readonly vuementService: VuementService) {}

  @Get('components')
  async getComponents(): Promise<VMComponent[]> {
    return this.vuementService.getComponents();
  }

  @Get('props')
  async getProps(): Promise<VMProp[]> {
    return this.vuementService.getProps();
  }

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Post('component')
  async createComponent(
    @Body() dto: CreateVMComponentDTO,
  ): Promise<VMComponent> {
    return this.vuementService.createComponent(dto);
  }

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Post('prop')
  async createProp(@Body() dto: CreateVMPropDTO): Promise<VMProp> {
    return this.vuementService.createProp(dto);
  }

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Patch('component/:id')
  async patchComponent(
    @Param('id') id: string,
    @Body() dto: UpdateVMComponentDTO,
  ): Promise<VMComponent> {
    return this.vuementService.patchComponent(id, dto);
  }

  @TGroups(['admin'])
  @UseGuards(AuthGuard('jwt'), GroupsGuard)
  @Patch('prop/:id')
  async patchProp(
    @Param('id') id: string,
    @Body() dto: UpdateVMPropDTO,
  ): Promise<VMProp> {
    return this.vuementService.patchProp(id, dto);
  }
}
