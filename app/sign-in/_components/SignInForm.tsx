"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TLoginSchema, loginSchema } from "@/lib/validators/userValidation";
import { login, signInWithWithGoogle } from "../actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";

const SignInForm = () => {
  const { toast } = useToast();
  const form = useForm<TLoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    await login(data).then((callback) => {
      if (callback?.error) {
        toast({
          variant: "destructive",
          description: callback.error,
        });
      }
    });
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithWithGoogle();
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
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Login using your creadentals or Google provider.
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
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="mt-4"
            >
              Sign up
            </LoadingButton>
          </form>
          <hr />
          <Button
            onClick={signInWithGoogleHandler}
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

export default SignInForm;
