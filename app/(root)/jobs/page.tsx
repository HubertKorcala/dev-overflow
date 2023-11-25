import JobCard from "@/components/cards/JobCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { jobFilters } from "@/constants/fliters";
import { SearchParamsProps } from "@/types/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Jobs | DevFlow",
};

type Job = {
  job_id: string;
  job_title: string;
  employer_logo: string;
  job_description: string;
  job_city: string;
  job_country: string;
  job_apply_link: string;
  job_employment_type: string;
};

type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  cca2: string;
};
export default async function Page({ searchParams }: SearchParamsProps) {
  const countriesResult = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restCountries`
  );
  const parsedCountriesResult = await countriesResult.json();
  const countriesData: Country[] = parsedCountriesResult.data;

  const { q: query = "", location: country = "", page = 1 } = searchParams;

  const countryCode = country ? `&country=${encodeURIComponent(country)}` : "";

  const encodedQuery = encodeURIComponent(query);

  const isNext = +page >= 1 && +page < 100;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jsearch?query=${encodedQuery}&page=${page}&num_pages=1${countryCode}`
  );
  const parsedData = await result.json();
  const data: Job[] = parsedData.data;

  const getCountryData = (country: string) => {
    return countriesData.find((countryData) => countryData.cca2 === country);
  };

  const getFlag = (country: string): string => {
    const data = getCountryData(country);
    return data?.flags?.png ?? "";
  };

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company or Keywords"
          otherClasses="flex-1"
        />

        <Filter
          filters={jobFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          type="location"
        />
      </div>
      <p></p>
      {
        <div className="mt-10 flex w-full flex-col gap-6">
          {data?.length > 0 ? (
            data.map((item) => (
              <JobCard
                key={item.job_id}
                title={item.job_title}
                image={item.employer_logo}
                description={item.job_description}
                city={item.job_city}
                country={item.job_country}
                flag={getFlag(item.job_country)}
                link={item.job_apply_link}
                type={item.job_employment_type}
              />
            ))
          ) : (
            <NoResult
              title="There`s no job applications to show"
              description=""
              link="/"
              linkTitle="Home"
            />
          )}
        </div>
      }
      {data.length > 0 && (
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={isNext}
          />
        </div>
      )}
    </>
  );
}
