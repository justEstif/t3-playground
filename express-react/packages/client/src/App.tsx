import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.scss";
import { trpc } from "./trpc";

const client = new QueryClient();
const AppContent = () => {
  const hello = trpc.useQuery(["hello"]);

  return (
    <div className="mx-auto mt-10 max-w-6xl text-3xl">
      {JSON.stringify(hello.data)}
    </div>
  );
};
const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
