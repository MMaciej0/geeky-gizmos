import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import SignUpForm from "./_components/SignUpForm";

const SignUpPage = () => {
  return (
    <MaxWidthWrapper className="pb-10 pt-14 md:pt-32">
      <div className="m-auto max-w-[400px]">
        <SignUpForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default SignUpPage;
