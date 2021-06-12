import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_doc: VMProp, ret: VMProp) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class VMProp extends Document {
  @Prop()
  name: string;

  @Prop()
  value: string;

  @Prop()
  description: string;

  @Prop()
  type: string;
}

export const VMPropSchema = SchemaFactory.createForClass(VMProp);
