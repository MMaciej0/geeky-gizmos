import React from "react";

interface UnapprovedProductPageProps {
  params: {
    slug: string;
  };
}

const UnapprovedProductPage = ({
  params: { slug },
}: UnapprovedProductPageProps) => {
  return <div>{slug}</div>;
};

export default UnapprovedProductPage;
