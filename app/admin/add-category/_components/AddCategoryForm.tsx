"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TAddCategorySchema,
  addCategoryFormSchema,
} from "@/lib/validators/addProductValidation";
import { createCategory } from "../actions";

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
import LoadingButton from "@/components/LoadingButton";

const AddCategoryForm = () => {
  const { toast } = useToast();
  const form = useForm<TAddCategorySchema>({
    defaultValues: {
      name: "",
      image: null,
    },
    resolver: zodResolver(addCategoryFormSchema),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TAddCategorySchema> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    const result = await createCategory(formData);

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    }

    if (result?.success) {
      reset();
      toast({
        description: result.success,
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
                <Input {...field} placeholder="Category name..." />
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

        <div className="mb-4 mt-12">
          <LoadingButton
            className="mt-10 w-full"
            isLoading={isSubmitting}
            type="submit"
          >
            Create category
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
