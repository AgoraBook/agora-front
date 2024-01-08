import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

interface IRootProviderProps {
  children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient();

const RootProvider: React.FunctionComponent<IRootProviderProps> = ({
  children,
}) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default RootProvider;
