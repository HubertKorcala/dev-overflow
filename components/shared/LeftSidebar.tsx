"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar light-border background-light900_dark200 sticky left-0 top-0 flex h-screen  w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            }
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? `primary-gradient rounded-lg text-light-900`
                  : `text-dark300_light900 hover:bg-light-800 dark:hover:bg-dark-400`
              } flex items-center justify-start gap-4 rounded-lg bg-transparent
                p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : `invert-colors`}`}
              />
              <p
                className={`${
                  isActive ? `base-bold` : `base-medium`
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <SignedIn>
          <Link href="/sign-in">
            <Button className=" text-dark400_light900 invert-colors min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="logout"
                width={20}
                height={20}
              />
              <span className="max-lg:hidden">Logout</span>
            </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button className="small-medium text-dark400_light900 btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className=" max-lg:hidden">Log In</span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium text-dark400_light900 light-border-2  btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className=" max-lg:hidden">Log Out</span>
            </Button>
          </Link>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSidebar;
