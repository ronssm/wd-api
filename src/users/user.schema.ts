import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  givenName: string;

  @Prop()
  familyName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
