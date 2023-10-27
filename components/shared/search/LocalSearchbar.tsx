"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type CustomInputProps = {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div className="relative w-full">
      <div
        className={`background-light800_darkgradient relative flex min-h-[56px] grow 
      items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          // value=""
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none"
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            alt="search icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearch;
