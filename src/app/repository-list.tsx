"use client";
import { ChangeEvent, useState } from "react"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useDebounceValue } from 'usehooks-ts'
import { Input } from "@/components/ui/input"
import { useSearchRepositoriesQuery } from "@/services/githubApi"
import { RepositoryListEmptyState } from "./repository-list-empty-state";
import { RepositoryListLoading } from "./repository-list-loading";
import RepositoryListError from "./repository-list-error";
import { RepositoryCard } from "./repository-card";

export default function RepositoryList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounceValue(searchTerm, 500)

  const { data, error, isLoading, isFetching } = useSearchRepositoriesQuery({
    searchTerm: debouncedSearchTerm,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setDebouncedSearchTerm(event.target.value);
  };

  const isEmptyList = Number(data?.search?.nodes?.length) > 0

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto] gap-4 p-4 md:p-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white text-sm shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
            placeholder="Search repositories..."
            type="search"
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </div>
      </div>
      {isLoading || isFetching ? <RepositoryListLoading /> : null}
      {error ? <RepositoryListError /> : null}
      {isEmptyList ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
          {data?.search?.nodes?.map(repository => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))}
        </section>
      ) : (
        <RepositoryListEmptyState />
      )}
    </>
  )
}
