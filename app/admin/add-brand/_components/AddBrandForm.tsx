"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TAddBrandSchema,
  addBrandSchema,
} from "@/lib/validators/addProductValidation";
import { createBrand } from "../actions";

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

const AddBrandForm = () => {
  const { toast } = useToast();
  const form = useForm<TAddBrandSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(addBrandSchema),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TAddBrandSchema> = async (data) => {
    const result = await createBrand(data);

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
                <Input {...field} placeholder="Brand name..." />
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
            Create brand
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddBrandForm;
