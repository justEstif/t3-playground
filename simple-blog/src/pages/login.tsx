import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const Login: NextPage = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });
  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>{success}</p>}
        <h1>Login</h1>
        <input
          type="email"
          placeholder="janedoe@example.com"
          {...register("email")}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
};

export default Login;
