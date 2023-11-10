import { Document, Schema, model, models } from "mongoose";

export type TInteraction = {
  user: Schema.Types.ObjectId;
  action: string;
  questions: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
} & Document;

const InteractionSchema = new Schema<TInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    questions: { type: Schema.Types.ObjectId, ref: "Question" },
    answers: { type: Schema.Types.ObjectId, ref: "Answer" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
