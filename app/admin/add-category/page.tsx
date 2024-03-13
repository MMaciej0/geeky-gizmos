import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddCategoryForm from "./_components/AddCategoryForm";

const AddCategoryPage = () => {
  return (
    <div className="py-10">
      <MaxWidthWrapper className="space-y-8">
        <AddCategoryForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default AddCategoryPage;
