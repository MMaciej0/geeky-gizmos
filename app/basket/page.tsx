import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BasketBody from "./_components/BasketBody";

const BasketPage = async () => {
  return (
    <MaxWidthWrapper className="mx-auto h-[85vh] w-2/5 pb-8">
      <h1 className="py-4 text-center text-3xl">Your Basket</h1>
      <BasketBody />
    </MaxWidthWrapper>
  );
};

export default BasketPage;
