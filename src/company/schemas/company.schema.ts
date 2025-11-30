import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Document } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export type CompanyDocument = Company & Document;
@Schema({ timestamps: true })
export class Company{
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({default : false})
  isDeleted: boolean;

  @Prop({
    type: {
    _id: { type: Types.ObjectId, ref: 'User' },
    email: { type: String },
  }
  })
  createdBy: { _id:Types.ObjectId, email:string };
  
  @Prop({
    type: {
    _id: { type: Types.ObjectId, ref: 'User' },
    email: { type: String },
  }
  })
  updateBy: { _id: Types.ObjectId, email: string };
  
  @Prop({
  type: {
      _id: { type: Types.ObjectId, ref: 'User' },
      email: { type: String },
  }
  })
  deletedBy: { _id: Types.ObjectId, email: string };
}

export const CompanySchema = SchemaFactory.createForClass(Company);