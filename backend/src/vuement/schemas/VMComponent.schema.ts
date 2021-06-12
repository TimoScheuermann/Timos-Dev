import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_doc: VMComponent, ret: VMComponent) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class VMComponent extends Document {
  @Prop()
  name: string;

  @Prop({ required: false })
  image?: string;

  @Prop()
  children: string[];

  @Prop({ required: false })
  isChild?: boolean;

  @Prop()
  props: string[];
}

export const VMComponentSchema = SchemaFactory.createForClass(VMComponent);
