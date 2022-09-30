import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useMutation(["users.register-user"]);
  if (isLoading) {
    return <p>Loading ...</p>;
  } else if (error) {
    return <div>{JSON.stringify(error)}</div>;
  } else {
    return <div>{JSON.stringify(data)}</div>;
  }
};

export default Home;
