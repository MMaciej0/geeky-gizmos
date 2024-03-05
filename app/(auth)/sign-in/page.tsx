import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignInForm from "./_components/SignInForm";

const SignInPage = () => {
  return (
    <MaxWidthWrapper className="pt-20 md:pt-40">
      <div className="m-auto max-w-[400px]">
        <SignInForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default SignInPage;
