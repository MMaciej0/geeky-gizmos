import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddBrandForm from "./_components/AddBrandForm";

const AddBrandPage = () => {
  return (
    <div className="py-10">
      <MaxWidthWrapper className="space-y-8">
        <AddBrandForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default AddBrandPage;
