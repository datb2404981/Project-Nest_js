import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;
  
  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      name: { type: String },
    }
  })
  company: {
    _id: mongoose.Types.ObjectId;
  name: string;
  };

  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
      name : {type: String}
    }
  })
  role: {
    _id: mongoose.Types.ObjectId;
  name: string;
  };


  @Prop()
  refreshToken: string;

  @Prop({ type: Object })
  createBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
  }
  
  @Prop({ type: Object })
  upadateBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
  }
  
  @Prop({ type: Object })
  deleteBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
    }
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
