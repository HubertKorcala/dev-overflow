"use server";

import Question, { TQuestion } from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag, { TagType } from "@/database/tag.model";

type Params = { title: string; content: string; tags: string[]; author; path };

export async function createQuestion(params: Params) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question: TQuestion = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log("WRONG IN ACTION", error);
  }
}
