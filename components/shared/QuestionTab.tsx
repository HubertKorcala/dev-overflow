import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

type Props = {
  userId: string;
  clerkId?: string | null;
} & SearchParamsProps;

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams : 1,
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

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNextQuestions}
      />
    </>
  );
};

export default QuestionTab;
