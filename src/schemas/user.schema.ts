import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ unique: true })
  challengeId: string;

  @Prop()
  shareImageUrl: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);