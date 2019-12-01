import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Queries from "./Assets/Queries";
import RepoSearch from "./components/RepoSearch";
import RepoGrid from "./components/RepoGrid";

const RepoFinderDom = styled.div`
  > article {
    padding: 0 0.5rem;
    margin: 0.5rem 0;
  }
`;

const Loading = () => (
  <p>
    Loading{" "}
    <span role="img" aria-label="emoji">
      ⏱⏱
    </span>
    ...
  </p>
);

const Error = ({ error }) => (
  <p>
    Error{" "}
    <span role="img" aria-label="emoji">
      😞
    </span>
    {console.log(error)}
    {error.toString()}
  </p>
);

class RepoFinder extends React.Component {
  state = {
    searchText: ""
  };

  handleSubmit = (e, searchText) => {
    e.preventDefault();
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;

    return (
      <RepoFinderDom>
        <RepoSearch onSubmit={this.handleSubmit} />
        <article>
          {searchText && (
            <Query
              query={Queries.SEARCH_REPOS_QUERY}
              variables={{ searchText }}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return <Error error={error} />;

                return (
                  <React.Fragment>
                    <RepoGrid
                      totalCount={data.search.repositoryCount}
                      repos={data.search.edges}
                      key={searchText}
                    />
                  </React.Fragment>
                );
              }}
            </Query>
          )}
          {!searchText && (
            <p>
              Start by searching for a github repository. For example, Try
              "Arabic-English-Subtitling"{" "}
              <span role="img" aria-label="emoji">
                😊
              </span>
            </p>
          )}
        </article>
      </RepoFinderDom>
    );
  }
}

export default RepoFinder;
