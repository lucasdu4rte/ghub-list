import { gql } from "graphql-request";

export const SEARCH_REPOSITORIES_QUERY = gql`
  query SearchRepositories($searchTerm: String!, $after: String) {
    search(query: $searchTerm, type: REPOSITORY, first: 16, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          owner {
            login
            avatarUrl
          }
          description
        }
      }
    }
  }
`;

export const GET_REPOSITORY_QUERY = gql`
  query GetRepositoryInfo($repositoryId: ID!) {
    node(id: $repositoryId) {
      ... on Repository {
        id
        name
        description
        url
        owner {
          login
          avatarUrl
        }
        issues(states: OPEN) {
          totalCount
        }
        pullRequests(states: OPEN) {
          totalCount
        }
        stargazers {
          totalCount
        }
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;
