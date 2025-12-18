import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema({
  timestamps: true, // tự tạo createdAt, updatedAt
})
export class Role {
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  isActive: string

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Permission' })
  permissions : [mongoose.Types.ObjectId]

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
export const RoleSchema = SchemaFactory.createForClass(Role);