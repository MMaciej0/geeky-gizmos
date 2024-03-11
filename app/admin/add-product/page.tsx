import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddProductForm from "./_components/AddProductForm";
import { findProductById } from "@/lib/utils";
import { notFound } from "next/navigation";

interface AddProductPageProps {
  searchParams: {
    id?: string;
  };
}

const AddProductPage = async ({
  searchParams: { id },
}: AddProductPageProps) => {
  const product = id ? await findProductById(Number(id)) : null;

  if (id && !product) return notFound();

  return (
    <div className="py-10">
      <MaxWidthWrapper className="space-y-8">
        <AddProductForm productToEdit={product} />
      </MaxWidthWrapper>
    </div>
  );
};

export default AddProductPage;
