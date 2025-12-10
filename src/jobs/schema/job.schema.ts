import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types,Document, Date } from "mongoose";

export type JobDocument = Job & Document;
@Schema({ timestamps: true })
export class Job {
  @Prop()
  name: string
  
  @Prop({type :[String]})
  skills: string[]

  @Prop({
    type: {
      _id: { type: Types.ObjectId, ref: "Comapny" },
      name: {type:String},
    }
  })
  company: { _id:Types.ObjectId, name:string }

  @Prop()
  location: string

  @Prop()
  salary: number

  @Prop()
  quantity: string

  @Prop()
  level: string

  @Prop()
  description: string

  @Prop({ type: Date, default: Date.now })
  startDate: Date;

  @Prop({ type: Date, default: Date.now })
  endDate: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: { _id:Types.ObjectId, email:string };
}

export const JobSchema = SchemaFactory.createForClass(Job);