import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop()
  title: string;

  @Prop()
  icon: string;

  @Prop()
  description: string;

  @Prop({ required: false })
  website?: string;

  @Prop({ required: false })
  github?: string;

  @Prop({ required: false })
  npmjs?: string;

  @Prop()
  hero: string;

  @Prop()
  thumbnail: string;

  @Prop()
  tools: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
