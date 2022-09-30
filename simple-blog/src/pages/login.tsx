import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const Login: NextPage = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
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
