import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Queries from "./Assets/Queries";
import localStorageService from "./services/localstorage";
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
    searchText: "",
    savedReposList: []
  };

  componentDidMount() {
    const savedReposList = localStorageService.getStorage();
    this.setState({
      savedReposList
    });
  }

  handleSubmit = (e, searchText) => {
    e.preventDefault();
    this.setState({ searchText });
  };

  handleAdd = repo => {
    const savedReposList = localStorageService.saveRepo(repo);
    this.setState({
      savedReposList: [...savedReposList]
    });
  };

  handleMinus = id => {
    const { savedReposList } = this.state;
    const repo = savedReposList.find(repo => repo.id === id);
    const newSavedReposList = localStorageService.removeRepo(repo);
    this.setState({
      savedReposList: [...newSavedReposList]
    });
  };

  render() {
    const { savedReposList, searchText } = this.state;

    return (
      <RepoFinderDom>
        <RepoSearch onSubmit={this.handleSubmit} />

        <article>
          {/* Saved repos */}
          {savedReposList.length > 0 && (
            <React.Fragment>
              <h3>Saved Repos ({savedReposList.length})</h3>
              <RepoGrid repos={savedReposList} onMinus={this.handleMinus} />
              <hr />
            </React.Fragment>
          )}

          {/* Search output */}
          {searchText && (
            <Query
              query={Queries.SEARCH_REPOS_QUERY}
              variables={{ searchText }}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return <Error error={error} />;

                const repos = data.search.edges.map(repo => repo.node);
                return (
                  <React.Fragment>
                    <RepoGrid
                      repos={repos}
                      key={searchText}
                      onAdd={this.handleAdd}
                      totalCount={data.search.repositoryCount}
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
