import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document, Date } from "mongoose";

export type JobDocument = Job & Document;
@Schema({
  timestamps: true,
  _id: false, // we define our own string _id to match existing data
})
export class Job {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id: string;

  @Prop()
  name: string
  
  @Prop({type :[String]})
  skills: string[]

  @Prop({
    type: {
      _id: { type: Types.ObjectId, ref: "Comapny" },
      name: { type: String },
      logo: {type:String }
    }
  })
  company: { _id:Types.ObjectId, name:string,logo:string }

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
  createdBy: { _id: Types.ObjectId, email: string }
  

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updateBy: { _id: Types.ObjectId, email: string }

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deleteBy: { _id: Types.ObjectId, email: string }
}

export const JobSchema = SchemaFactory.createForClass(Job);
