"use client";
import { StarIcon } from "@radix-ui/react-icons";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { GitBranchIcon } from "@/components/icons/git-branch-icon";
import { DoorOpenIcon } from "@/components/icons/door-open-icon";
import { GitPullRequestIcon } from "@/components/icons/git-pull-request-icon";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepositoryDialogLoading() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none">
      <CardHeader className="grid grid-cols-[48px_1fr] items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1">
          <CardTitle>
            <Skeleton className="h-4 w-[150px]" />
          </CardTitle>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[330px]" />
          <Skeleton className="h-4 w-[310px]" />
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
            data-tooltip-id="stats-tooltip"
            data-tooltip-content="Stars"
          >
            <StarIcon className="h-4 w-4" />
            <span><Skeleton className="h-4 w-[30px]" /></span>
          </div>

          <div
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
            data-tooltip-id="stats-tooltip"
            data-tooltip-content="Commits"
          >
            <GitBranchIcon className="h-4 w-4" />
            <span><Skeleton className="h-4 w-[30px]" /></span>
          </div>

          <div
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
            data-tooltip-id="stats-tooltip"
            data-tooltip-content="Opened Issues"
          >
            <DoorOpenIcon className="h-4 w-4" />
            <span><Skeleton className="h-4 w-[30px]" /></span>
          </div>

          <div
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
            data-tooltip-id="stats-tooltip"
            data-tooltip-content="Opened Pull Requests"
          >
            <GitPullRequestIcon className="h-4 w-4" />
            <span><Skeleton className="h-4 w-[30px]" /></span>
          </div>
          <ReactTooltip id="stats-tooltip" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span><Skeleton className="h-4 w-[110px]" /></span>
      </CardFooter>
    </Card>
  )
}

