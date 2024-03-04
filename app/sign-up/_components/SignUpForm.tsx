"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register, signUpWithGoogle } from "../actions";
import {
  TRegisterSchema,
  registerSchema,
} from "@/lib/validators/userValidation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";

const SignUpForm = () => {
  const { toast } = useToast();
  const form = useForm<TRegisterSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TRegisterSchema> = async (data) => {
    await register(data).then((callback) => {
      if (callback?.error) {
        toast({
          variant: "destructive",
          description: callback.error,
        });
      }
    });
  };

  const signUpWithGoogleHandler = async () => {
    try {
      await signUpWithGoogle();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong. Try again later.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Register using your creadentals or Google provider.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 grid grid-cols-1 gap-4"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="mt-4"
            >
              Sign up
            </LoadingButton>
          </form>
          <hr />
          <Button
            onClick={signUpWithGoogleHandler}
            className="mt-4 w-full"
            variant="outline"
          >
            Sign up with Google
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;