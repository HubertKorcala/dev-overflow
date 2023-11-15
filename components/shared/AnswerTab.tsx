import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types/types";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

type Props = {
  userId: string;
  clerkId?: string | null;
} & SearchParamsProps;

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNextAnswers}
      />
    </>
  );
};

export default AnswerTab;
