import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Destination {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [String], required: true })
  clues: string[];

  @Prop({ type: [String], required: true, name: 'fun_fact' })
  funFacts: string[];

  @Prop({ type: [String] })
  trivia: string[];
}

export type DestinationDocument = Destination & Document;
export const DestinationSchema = SchemaFactory.createForClass(Destination);