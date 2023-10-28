import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/home/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/fliters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "What is React?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "Klaudia Chołuj",
      picture: "url_to_klaudia_picture",
    },
    upvotes: 10000,
    views: 10000000,
    answers: [],
    createdAt: new Date("2023-10-04T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "What is Next.js?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "2",
      name: "Hubert Korcala",
      picture: "url_to_hubert_picture",
    },
    upvotes: 15,
    views: 180,
    answers: [],
    createdAt: new Date("2020-01-04T12:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
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
            title="There`s no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
