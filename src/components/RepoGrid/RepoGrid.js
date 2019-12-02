import React from "react";
import styled from "styled-components";
import Repo from "../Repo";

const RepoGridDom = styled.div`
  > div {
    display: grid;
    grid-template-columns: 450px auto auto auto;
    grid-gap: 25px;
  }
`;

class RepoGrid extends React.Component {
  state = {
    repoList: this.props.repos,
    savedReposList: []
  };

  componentWillReceiveProps(nextProps) {
    const { repos } = nextProps;
    if (this.state.repoList !== repos) {
      this.setState({ repoList: repos });
    }
  }

  handleDelete = id => {
    const { repoList } = this.state;
    this.setState({
      repoList: [...repoList.filter(repo => repo.id !== id)]
    });
  };

  render() {
    const { totalCount, onAdd, onMinus } = this.props;
    const { repoList } = this.state;

    return (
      <RepoGridDom>
        {repoList.length > 0 && (
          <React.Fragment>
            {totalCount && (
              <h3>{`Showing ${repoList.length} of ${totalCount} Repositories 🔥`}</h3>
            )}
            <div>
              {repoList.map(repo => (
                <Repo
                  repo={repo}
                  key={repo.id}
                  onAdd={onAdd}
                  onMinus={onMinus}
                  onDelete={this.handleDelete}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </RepoGridDom>
    );
  }
}

export default RepoGrid;
