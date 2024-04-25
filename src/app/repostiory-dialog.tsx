"use client";
import { StarIcon } from "@radix-ui/react-icons";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { repositoryModalSlice } from "@/slices/selectRepository.slice";
import { useGetRepositoryQuery } from "@/services/githubApi";
import { GitBranchIcon } from "@/components/icons/git-branch-icon";
import { DoorOpenIcon } from "@/components/icons/door-open-icon";
import { GitPullRequestIcon } from "@/components/icons/git-pull-request-icon";
import RepositoryDialogLoading from "./repository-dialog-loading";

function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}


export default function RepositoryDialog() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.repository.isOpen)
  const selectedRepositoryId = useAppSelector(
    state => state.repository.selectedRepositoryId
  )
  const isEnabled = !selectedRepositoryId
  const { data, isLoading, isFetching } = useGetRepositoryQuery(
    {
      repositoryId: selectedRepositoryId!
    },
    {
      skip: isEnabled
    }
  )

  const onOpenChange = () => {
    dispatch(repositoryModalSlice.actions.closeModal())
  }

  const title = data?.node?.name
  const repoUrl = String(data?.node?.url)
  const ownerLogin = data?.node?.owner?.login
  const ownerLoginAtSign = `@${ownerLogin}`
  const ownerLoginInitials = data?.node?.owner?.login.slice(0, 2)
  const ownerAvatar = data?.node?.owner?.avatarUrl
  const description = data?.node?.description
  const starsCount = formatCompactNumber(data?.node?.stargazers?.totalCount || 0)
  const commitsCount = formatCompactNumber(data?.node?.defaultBranchRef?.target?.history?.totalCount || 0)
  const openedIssuesCount = formatCompactNumber(data?.node?.issues?.totalCount || 0)
  const openedPullRequests = formatCompactNumber(data?.node?.pullRequests?.totalCount || 0)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isLoading || isFetching ? (
          <RepositoryDialogLoading />
        ) : (
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="grid grid-cols-[48px_1fr] items-center gap-4">
              <Avatar>
                <AvatarImage alt={ownerLoginAtSign} src={ownerAvatar} />
                <AvatarFallback>{ownerLoginInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle>{title}</CardTitle>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {ownerLoginAtSign}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                {description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 tabular-nums"
                  data-tooltip-id="stats-tooltip"
                  data-tooltip-content="Stars"
                >
                  <StarIcon className="h-4 w-4" />
                  <span>{starsCount}</span>
                </div>

                <div
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 tabular-nums"
                  data-tooltip-id="stats-tooltip"
                  data-tooltip-content="Commits"
                >
                  <GitBranchIcon className="h-4 w-4" />
                  <span>{commitsCount}</span>
                </div>

                <div
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 tabular-nums"
                  data-tooltip-id="stats-tooltip"
                  data-tooltip-content="Opened Issues"
                >
                  <DoorOpenIcon className="h-4 w-4" />
                  <span>{openedIssuesCount}</span>
                </div>

                <div
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 tabular-nums"
                  data-tooltip-id="stats-tooltip"
                  data-tooltip-content="Opened Pull Requests"
                >
                  <GitPullRequestIcon className="h-4 w-4" />
                  <span>{openedPullRequests}</span>
                </div>
                <ReactTooltip id="stats-tooltip" />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Link
                className="text-sm text-gray-500 hover:underline dark:text-gray-400"
                href={repoUrl!}
                target="_blank"
              >
                View repository
              </Link>
            </CardFooter>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}

