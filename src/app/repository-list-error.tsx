"use client";
import { AlertTriangleIcon } from "@/components/icons/alert-triangle-icon";
import { Button } from "@/components/ui/button"

export default function RepositoryListError() {
  const reloadPage = () => {
    window.location.reload();
  }
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangleIcon className="h-16 w-16 text-red-500" />
        <h1 className="text-3xl font-bold">Oops, something went wrong!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {`We're sorry, but we couldn't load the repository list. Please try reloading the page.`}
        </p>
        <Button className="mt-4" variant="outline" onClick={reloadPage}>
          Reload Page
        </Button>
      </div>
    </div>
  )
}

