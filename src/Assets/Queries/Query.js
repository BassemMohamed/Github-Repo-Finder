import { gql } from "apollo-boost";

const SEARCH_REPOS_QUERY = gql`
  query($searchText: String!) {
    search(query: $searchText, type: REPOSITORY, first: 50) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            url
            name
            description
            forkCount
            owner {
              login
              avatarUrl
            }
            watchers {
              totalCount
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export default { SEARCH_REPOS_QUERY };
