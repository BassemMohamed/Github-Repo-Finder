import React from "react";
import styled from "styled-components";
import Repo from "../Repo";

const RepoGridDom = styled.div`
  > div {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 25px;
  }
`;

class RepoGrid extends React.Component {
  state = {
    repoList: this.props.repos
  };

  handleDelete = id => {
    const { repoList } = this.state;
    this.setState({
      repoList: [...repoList.filter(repo => repo.node.id !== id)]
    });
  };

  render() {
    const { totalCount } = this.props;
    const { repoList } = this.state;

    return (
      <RepoGridDom>
        <p>{`Showing ${repoList.length} of ${totalCount} Repositories 🔥`}</p>
        <div>
          {repoList.map(({ node }) => (
            <Repo key={node.id} repo={node} onDelete={this.handleDelete} />
          ))}
        </div>
      </RepoGridDom>
    );
  }
}

export default RepoGrid;
