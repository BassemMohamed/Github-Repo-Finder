import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import RepoFinder from "./RepoFinder";

// Yes, this is an unsafe way ;)
// No longer unsafe ;)
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || ""; // <-- TODO: place your token here or in a .env file

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `token ${TOKEN}`
    }
  }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RepoFinder />
      </ApolloProvider>
    );
  }
}

export default App;
