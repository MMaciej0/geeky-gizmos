"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftToMarkdown } from "markdown-draft-js";
import { EditorState, ContentState } from "draft-js";

import {
  TAddProductSchema,
  addProductFormSchema,
} from "@/lib/validators/addProductValidation";
import { createOrUpdateProduct } from "../actions";
import { ProductWithPayload } from "@/types/product";
import { Brand, Category } from "@prisma/client";
import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface AddProductFormProps {
  productToEdit: ProductWithPayload | null;
  brands: Brand[];
  categories: Category[];
}

const AddProductForm = ({
  productToEdit,
  categories,
  brands,
}: AddProductFormProps) => {
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<TAddProductSchema>({
    defaultValues: {
      name: productToEdit?.name || "",
      image: null,
      price: productToEdit?.price.toString() || "",
      category:
        productToEdit?.categories.map((cat) => cat.category.name).join(",") ||
        "",
      stock: productToEdit?.stock.toString() || "",
      description: productToEdit?.description || "",
      brand: productToEdit?.brand.name || "",
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
  const selectableCategory = category
    ? category.split(",").map((c) => ({
        value: c,
        label: categories.find((cat) => cat.id === Number(c))!.name,
      }))
    : [];
  const brand = watch("brand");

  const onSubmit: SubmitHandler<TAddProductSchema> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    const result = await createOrUpdateProduct(formData, productToEdit?.id);

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
          render={() => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Popover
                  open={isBrandListOpen}
                  onOpenChange={setIsBrandListOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      className="flex w-full justify-between"
                      variant="outline"
                    >
                      {brand
                        ? brands.find((b) => b.id === Number(brand))?.name
                        : "Select brand..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search brand..." />
                      <CommandEmpty>No brand found.</CommandEmpty>
                      <CommandGroup>
                        {brands.map((b) => (
                          <CommandItem
                            key={b.id}
                            value={b.id.toString()}
                            onSelect={(currentValue) => {
                              setValue("brand", currentValue);
                              trigger("brand");
                              setIsBrandListOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                brand === b.id.toString()
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {b.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                  selectables={categories.map((cat) => ({
                    value: cat.id.toString(),
                    label: cat.name,
                  }))}
                  selected={selectableCategory}
                  setSelected={(newCategories) => {
                    setValue(
                      "category",
                      newCategories.map((c) => c.value).join(","),
                    );
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
