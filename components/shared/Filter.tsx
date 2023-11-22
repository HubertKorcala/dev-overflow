"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  type?: "location";
};

const Filter = ({ filters, otherClasses, containerClasses, type }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let paramFilter;
  let key: string;

  if (type === "location") {
    paramFilter = searchParams.get("location");
    key = "location";
  } else {
    paramFilter = searchParams.get("filter");
    key = "filter";
  }

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key,
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 ${otherClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue
              placeholder={`${
                type === "location" ? "Select Location" : "Select a Filter"
              }`}
            />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 text-dark500_light700 small-regular max-h-[300px] border-none">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="hover:background-light700_dark400 cursor-pointer"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
