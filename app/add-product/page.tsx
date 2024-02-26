import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddProductForm from "./_components/AddProductForm";

const AddProductPage = () => {
  return (
    <div className="py-10">
      <MaxWidthWrapper className="space-y-8">
        <AddProductForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default AddProductPage;
