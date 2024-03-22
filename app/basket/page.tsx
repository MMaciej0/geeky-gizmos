import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BasketBody from "./_components/BasketBody";

const BasketPage = async () => {
  return (
    <MaxWidthWrapper className="pb-8">
      <h1 className="my-6 text-center text-3xl">Your basket</h1>
      <BasketBody />
    </MaxWidthWrapper>
  );
};

export default BasketPage;
