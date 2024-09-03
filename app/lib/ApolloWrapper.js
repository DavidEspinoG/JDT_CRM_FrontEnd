"use client";
import { HttpLink, createHttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

function makeClient() {
  const httpLink = new createHttpLink({
    uri: "http://localhost:4000"
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    console.log('token---', token)
    return {
      headers: {
        ...headers, 
        authorization: token ? `Bearer ${token}` : "",
        test: 'my test'
      }
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}