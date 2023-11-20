import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | DevFlow",
};

export default function Page() {
  return <SignUp />;
}
