import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
  InMemoryCache,
} from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities";

import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { AUTH_TOKEN } from "./constants";

import "tachyons/css/tachyons.min.css";
import "./styles/index.css";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
