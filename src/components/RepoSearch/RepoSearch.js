import React from "react";
import styled from "styled-components";
import logo from "../../logo.svg";

const Form = styled.header`
  background-color: #222;
  text-align: center;
  padding: 0.75rem;
  color: white;

  > form {
    margin: 0.5rem 0;
  }
`;

class RepoSearch extends React.Component {
  state = {
    searchText: ""
  };

  onTextChange = e => {
    if (e.currentTarget) {
      this.setState({ searchText: e.currentTarget.value });
    }
  };

  render() {
    const { onSubmit } = this.props;
    const { searchText } = this.state;

    return (
      <Form>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Search Github Repositories</h1>
        <form>
          <input
            value={searchText ? searchText : ""}
            placeholder="Name of Repository"
            onChange={this.onTextChange}
          />
          <input
            type="submit"
            value="Search"
            onClick={e => onSubmit(e, searchText)}
          />
        </form>
      </Form>
    );
  }
}

export default RepoSearch;
