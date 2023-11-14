import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              key={question._id}
            />
          ))
        ) : (
          <NoResult
            title="There`s no tag questions to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. Our query could be the next big thing others learn from. Get
      involved! 💡"
            link="/"
            linkTitle="All Questions"
          />
        )}
      </div>
    </>
  );
};

export default Page;
