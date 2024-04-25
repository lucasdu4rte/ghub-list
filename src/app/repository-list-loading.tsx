"use client";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const generatedArray = Array.from(Array(10).keys())
export function RepositoryListLoading() {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6"
    >
      {generatedArray.map((index) =>
        <button
          key={index}
          className="cursor-wait"
        >
          <Card>
            <CardHeader className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-1">
                <CardTitle className="text-left">
                  <Skeleton className="h-4 w-[150px]" />
                </CardTitle>
                <CardDescription
                  className="text-gray-500 dark:text-gray-400 text-left truncate"
                >
                  <Skeleton className="h-4 w-[250px]" />
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <GitHubLogoIcon className="w-4 h-4" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </CardFooter>
          </Card>
        </button>
      )}
    </section>
  )
}
