import { UpdateVMPropDTO } from '../dtos/UpdateVMProp.dto';

export class UpdateVMPropValidator {
  public static validate(dto: UpdateVMPropDTO): UpdateVMPropDTO {
    const { name, value, description, type } = dto;

    const rDto = {} as UpdateVMPropDTO;

    if (name && name.length > 0) {
      rDto.name = name;
    }

    if (value && value.length > 0) {
      rDto.value = value;
    }

    if (description && description.length > 0) {
      rDto.description = description;
    }

    if (type && type.length > 0) {
      rDto.type = type;
    }

    return rDto;
  }
}
