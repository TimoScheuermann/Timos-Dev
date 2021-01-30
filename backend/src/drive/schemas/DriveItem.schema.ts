import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DriveItem extends Document {
  @Prop()
  filename: string;

  @Prop()
  originalname: string;

  @Prop()
  created: number;
}

export const DriveItemSchema = SchemaFactory.createForClass(DriveItem);
