import Link from "next/link";
import React from "react";
// import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import Image from "next/image";

type JobProps = {
  title: string;
  image?: string;
  description: string;
  city: string;
  country: string;
  flag: string;
  link: string;
  type: string;
};

const JobCard = ({
  title,
  image,
  description,
  city,
  country,
  flag,
  link,
  type,
}: JobProps) => {
  return (
    <div className="card-wrapper background-light900_dark200 flex gap-5 rounded-[10px] py-9 shadow-light-200 sm:px-11">
      <div className="flex items-center gap-6">
        <a
          className={`relative h-16 w-16 rounded-xl ${
            image ? `background-light800_dark400` : ""
          }`}
          href={link}
        >
          <Image
            src={`${image || "/assets/images/site-logo.svg"}`}
            alt="employer logo"
            width={64}
            height={64}
            className="absolute inset-0 h-full w-full object-cover p-2 text-transparent"
          />
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 max-md:flex-wrap">
          <Link href={link}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1">
              {title}
            </h3>
          </Link>
          <div className="background-light800_dark400 flex min-w-max  items-center gap-2 rounded-2xl p-2">
            <div className="h-3 w-3 min-w-fit">
              <Image
                src={flag}
                alt={`${country} flag`}
                height={12}
                width={12}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="small-medium text-dark200_light900 mr-2 min-w-fit">
              {`${city ? `${city}, ` : ""}${country}`}
            </p>
          </div>
        </div>
        <p className="text-dark200_light900 body-regular line-clamp-2">
          {description}
        </p>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-2">
            <Metric
              imgUrl="/assets/icons/clock.svg"
              alt="clock icon"
              value={`${type}`}
              title=""
              textStyles="small-medium ml-1 text-dark400_light800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
