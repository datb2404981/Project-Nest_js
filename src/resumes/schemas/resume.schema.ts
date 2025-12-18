import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResumeDocument = Resume & Document;

@Schema({
  timestamps: true, // tự tạo createdAt, updatedAt
})
export class Resume {

  /* ================= BASIC INFO ================= */

  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  url: string;

  @Prop({
    required: true,
    enum: ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;


  /* ================= RELATIONS ================= */

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;


  /* ================= HISTORY ================= */

  @Prop({
    type: [
      {
        status: { type: String, required: true },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: {
          _id: { type: Types.ObjectId, ref: 'User', required: true },
          email: { type: String, required: true },
        },
      },
    ],
    default: [],
  })
  history: {
    status: string;
    updatedAt: Date;
    updatedBy: {
      _id: Types.ObjectId;
      email: string;
    };
  }[];


  /* ================= AUDIT ================= */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
