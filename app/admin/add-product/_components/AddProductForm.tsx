"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftToMarkdown } from "markdown-draft-js";
import { EditorState, ContentState } from "draft-js";
import {
  TAddProductSchema,
  addProductFormSchema,
} from "@/lib/validators/addProductValidation";
import { createProduct } from "../actions";
import { Product } from "@prisma/client";

import { categories } from "@/app/_components/CategoriesGrid";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Multiselect from "@/components/ui/multiselect";
import RichTextEditor from "@/components/RichTextEditor";
import LoadingButton from "@/components/LoadingButton";

interface AddProductFormProps {
  productToEdit: Product | null;
}

const AddProductForm = ({ productToEdit }: AddProductFormProps) => {
  const { toast } = useToast();
  const form = useForm<TAddProductSchema>({
    defaultValues: {
      name: productToEdit?.name || "",
      image: null,
      price: productToEdit?.price.toString() || "",
      category: productToEdit?.category || "",
      stock: productToEdit?.stock.toString() || "",
      description: productToEdit?.description || "",
      brand: productToEdit?.brand || "",
    },
    resolver: zodResolver(addProductFormSchema),
  });
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setFocus,
    trigger,
    formState: { isSubmitting },
  } = form;
  const category = watch("category");

  const onSubmit: SubmitHandler<TAddProductSchema> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    const result = await createProduct(formData, productToEdit?.id);

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto max-w-[450px] space-y-4"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Product name..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Product brand..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="image"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...fieldValues}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    fieldValues.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="category"
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Multiselect
                  selectables={categories}
                  selected={category.length > 0 ? category.split(",") : []}
                  setSelected={(newCategories) => {
                    setValue("category", newCategories.join(","));
                    trigger("category");
                  }}
                  placeholder="Select category..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Price..."
                  type="number"
                  step="0.01"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Stock..." type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel onClick={() => setFocus("description")}>
                Description
              </FormLabel>
              <FormControl>
                <RichTextEditor
                  defaultEditorState={
                    productToEdit && productToEdit.description
                      ? EditorState.createWithContent(
                          ContentState.createFromText(
                            productToEdit.description,
                          ),
                        )
                      : EditorState.createEmpty()
                  }
                  ref={field.ref}
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-4 mt-12">
          <LoadingButton
            className="mt-10 w-full"
            isLoading={isSubmitting}
            type="submit"
          >
            {productToEdit ? "Edit" : "Create"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
