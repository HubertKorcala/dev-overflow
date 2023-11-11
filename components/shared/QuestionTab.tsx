import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

type Props = {
  userId: string;
  clerkId?: string | null;
} & SearchParamsProps;

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          _id={question._id}
          title={question.title}
          clerkId={clerkId}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
          key={question._id}
        />
      ))}
    </>
  );
};

export default QuestionTab;
