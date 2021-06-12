import { UnprocessableEntityException } from '@nestjs/common';
import { CreateVMComponentDTO } from '../dtos/CreateVMComponent.dto';

export class CreateVMComponentValidator {
  public static validate(dto: CreateVMComponentDTO): CreateVMComponentDTO {
    const { name } = dto;
    let { props, image, isChild, children } = dto;

    if (!name || name.length < 3) {
      throw new UnprocessableEntityException("Attribute 'name' is required.");
    }

    if (image && image.length < 5) {
      image = undefined;
    }

    if (isChild && String(isChild) === String(!!isChild)) {
      isChild = !!isChild;
    } else {
      isChild = undefined;
    }

    if (!children) {
      throw new UnprocessableEntityException(
        "Attribute 'children' is required.",
      );
    }
    children = [...new Set(children)];

    if (!props) {
      throw new UnprocessableEntityException("Attribute 'props' is required.");
    }
    props = [...new Set(props)];

    return {
      name,
      image,
      children,
      isChild,
      props,
    };
  }
}
