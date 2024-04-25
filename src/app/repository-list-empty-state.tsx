"use client";
import { GitForkIcon } from "@/components/icons/git-fork-icon";

export function RepositoryListEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <GitForkIcon className="h-16 w-16 text-gray-400 dark:text-gray-500" />
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">No Repositories Found</h2>
        <p className="text-gray-500 dark:text-gray-400">Try searching for a repository by name or topic.</p>
      </div>
    </div>
  )
}
