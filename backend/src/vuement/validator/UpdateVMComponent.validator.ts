import { UpdateVMComponentDTO } from '../dtos/UpdateVMComponent.dto';

export class UpdateVMComponentValidator {
  public static validate(dto: UpdateVMComponentDTO): UpdateVMComponentDTO {
    const { name, props, image, isChild, children } = dto;
    dto = { name, props, image, isChild: !!isChild, children };

    if (name && name.length < 3) {
      delete dto.name;
    }

    if (image && image.length < 5) {
      delete dto.image;
    }

    if (children) {
      dto.children = [...new Set(children)];
    }

    if (props) {
      dto.props = [...new Set(props)];
    }

    return dto;
  }
}
