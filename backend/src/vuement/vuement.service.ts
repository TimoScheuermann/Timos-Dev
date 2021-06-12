import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateVMComponentDTO } from './dtos/CreateVMComponent.dto';
import { CreateVMPropDTO } from './dtos/CreateVMProp.dto';
import { UpdateVMComponentDTO } from './dtos/UpdateVMComponent.dto';
import { UpdateVMPropDTO } from './dtos/UpdateVMProp.dto';
import { VMComponent } from './schemas/VMComponent.schema';
import { VMProp } from './schemas/VMProp.schema';
import { CreateVMComponentValidator } from './validator/CreateVMComponent.validator';
import { CreateVMPropValidator } from './validator/CreateVMProp.validator';
import { UpdateVMComponentValidator } from './validator/UpdateVMComponent.validator';
import { UpdateVMPropValidator } from './validator/UpdateVMProp.validator';

@Injectable()
export class VuementService {
  constructor(
    @InjectModel(VMComponent.name)
    private readonly vmComponentModel: Model<VMComponent>,
    @InjectModel(VMProp.name)
    private readonly vmPropModel: Model<VMProp>,
  ) {}

  public async getComponents(): Promise<VMComponent[]> {
    return this.vmComponentModel.find();
  }

  public async getProps(): Promise<VMProp[]> {
    return this.vmPropModel.find();
  }

  public async createComponent(
    dto: CreateVMComponentDTO,
  ): Promise<VMComponent> {
    dto = CreateVMComponentValidator.validate(dto);
    return this.vmComponentModel.create(dto);
  }

  public async createProp(dto: CreateVMPropDTO): Promise<VMProp> {
    dto = CreateVMPropValidator.validate(dto);
    return this.vmPropModel.create(dto);
  }

  public async patchComponent(
    id: string,
    dto: UpdateVMComponentDTO,
  ): Promise<VMComponent> {
    dto = UpdateVMComponentValidator.validate(dto);

    const comp = await this.getComponentById(id);
    if (!comp) {
      throw new UnprocessableEntityException(
        `Couldn't find component with id '${id}'`,
      );
    }

    await comp.update({ $set: dto });
    return this.getComponentById(id);
  }

  public async patchProp(id: string, dto: UpdateVMPropDTO): Promise<VMProp> {
    dto = UpdateVMPropValidator.validate(dto);

    const prop = await this.getPropById(id);
    if (!prop) {
      throw new UnprocessableEntityException(
        `Couldn't find component with id '${id}'`,
      );
    }

    await prop.update({ $set: dto });
    return this.getPropById(id);
  }

  private async getComponentById(id: string): Promise<VMComponent | null> {
    if (!isValidObjectId(id)) return null;
    return this.vmComponentModel.findById(id);
  }

  private async getPropById(id: string): Promise<VMProp | null> {
    if (!isValidObjectId(id)) return null;
    return this.vmPropModel.findById(id);
  }
}
