import { GET_REPOSITORY_QUERY, SEARCH_REPOSITORIES_QUERY } from "@/graphql/queries";
import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from "graphql-request";
import {
  GetRepositoryResponse,
  GetRepositoryVariables,
  RepoListResponse,
  RepoListVariables
} from '../@types'

const GITHUB_ACCESS_TOKEN = String(process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN)

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
