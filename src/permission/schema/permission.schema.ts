import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PermissionDocument = Permission& Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop()
  name: string
  
  @Prop()
  apiPath: string

  @Prop()
  method: string

  @Prop()
  module: string

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
export const PermissionSchema = SchemaFactory.createForClass(Permission);