export class CreateVMComponentDTO {
  name: string;
  image?: string;
  children: string[];
  isChild?: boolean;
  props: string[];
}
