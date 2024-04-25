import { GET_REPOSITORY_QUERY, SEARCH_REPOSITORIES_QUERY } from "@/graphql/queries";
import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from "graphql-request";

const GITHUB_ACCESS_TOKEN = String(process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN)

export type Repo = {
  id: string;
  name: string;
  description: string;
  owner: { login: string; avatarUrl: string; }
}

type RepoListResponse = {
  search?: {
    nodes?: Repo[]
  }
}

type RepoListVariables = {
  searchTerm?: string;
  after?: string;
}

export type RepoFull = {
  id: string;
  name: string;
  description: string;
  url: string;
  owner?: { login: string; avatarUrl: string; }
  issues?: {
    totalCount: number
  }
  pullRequests?: {
    totalCount: number
  }
  stargazers?: {
    totalCount: number
  }
  defaultBranchRef?: {
    target?: {
      history?: {
        totalCount?: number
      }
    }
  }
}

type GetRepositoryResponse = {
  node?: RepoFull
}
type GetRepositoryVariables = {
  repositoryId: string
}

const client = new GraphQLClient('https://api.github.com/graphql')

client.setHeader('Authorization', `Bearer ${GITHUB_ACCESS_TOKEN}`)
client.setHeader('X-Github-Next-Global-ID', '1')

export const githubApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    client
  }),
  endpoints: (builder) => ({
    searchRepositories: builder.query<
      RepoListResponse,
      RepoListVariables
    >({
      query: ({ searchTerm, after }) => ({
        document: SEARCH_REPOSITORIES_QUERY,
        variables: { searchTerm, after }
      }),
    }),
    getRepository: builder.query<
      GetRepositoryResponse,
      GetRepositoryVariables
    >({
      query: ({ repositoryId }) => ({
        document: GET_REPOSITORY_QUERY,
        variables: { repositoryId }
      }),
    })
  }),
})

export const {
  useSearchRepositoriesQuery,
  useLazySearchRepositoriesQuery,
  useGetRepositoryQuery,
  useLazyGetRepositoryQuery,
} = githubApi;
