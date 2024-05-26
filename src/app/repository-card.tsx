"use client";
import { Repo } from "@/@types";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card"
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { repositoryModalSlice } from "@/slices/selectRepository.slice";
import { useAppDispatch } from "@/lib/hooks";

type RepositoryCardProps = {
  repository: Repo
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const dispatch = useAppDispatch()

  const handleOpenModal = (repositoryId: string) => {
    dispatch(repositoryModalSlice.actions.setSelectedRepository(repositoryId))
    dispatch(repositoryModalSlice.actions.openModal())
  }

  return (
    <button
      className="cursor-pointer"
      onClick={() => handleOpenModal(repository.id)}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex gap-4">
          <Avatar>
            <AvatarImage alt={repository.owner.login} src={repository.owner.avatarUrl} />
            <AvatarFallback>{repository.owner.login.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-left">{repository.name}</CardTitle>
            <CardDescription
              className="text-gray-500 dark:text-gray-400 text-left truncate"
            >
              {repository.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <GitHubLogoIcon className="w-4 h-4" />
            <span>{repository.owner.login}</span>
          </div>
        </CardFooter>
      </Card>
    </button>
  )
}
