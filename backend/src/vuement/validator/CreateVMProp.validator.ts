import { UnprocessableEntityException } from '@nestjs/common';
import { CreateVMPropDTO } from '../dtos/CreateVMProp.dto';

export class CreateVMPropValidator {
  public static validate(dto: CreateVMPropDTO): CreateVMPropDTO {
    const { name, value, description, type } = dto;

    if (!name || name.length === 0) {
      throw new UnprocessableEntityException("Attribute 'name' is required.");
    }

    if (!value || value.length === 0) {
      throw new UnprocessableEntityException("Attribute 'value' is required.");
    }

    if (!description || description.length === 0) {
      throw new UnprocessableEntityException(
        "Attribute 'description' is required.",
      );
    }

    if (!type || type.length === 0) {
      throw new UnprocessableEntityException("Attribute 'type' is required.");
    }

    return { name, value, description, type };
  }
}
