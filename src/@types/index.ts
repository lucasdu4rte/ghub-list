export type Repo = {
  id: string;
  name: string;
  description: string;
  owner: { login: string; avatarUrl: string; }
}

export type RepoListResponse = {
  search?: {
    nodes?: Repo[]
  }
}

export type RepoListVariables = {
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

export type GetRepositoryResponse = {
  node?: RepoFull
}
export type GetRepositoryVariables = {
  repositoryId: string
}
