
export const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-8 w-1/4 dark:bg-gray-200/5 bg-gray-200 rounded" />
      </div>
      <div className="space-y-3">
        <div className="h-8 dark:bg-gray-200/5 bg-gray-200 rounded" />
        <div className="h-8 dark:bg-gray-200/5 bg-gray-200 rounded" />
        <div className="h-8 dark:bg-gray-200/5 bg-gray-200 rounded" />
        <div className="h-8 dark:bg-gray-200/5 bg-gray-200 rounded" />
        <div className="h-8 dark:bg-gray-200/5 bg-gray-200 rounded" />
        <div className="h-8 dark:bg-gray-200/5 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-between">
        <div className="h-8 w-1/4 dark:bg-gray-200/5 bg-gray-200 mb-6 rounded" />
        <div className="w-1/4 flex space-x-3">
          <div className="h-8 w-1/2 dark:bg-gray-200/5 bg-gray-200 mb-6 rounded" />
          <div className="h-8 w-1/2 dark:bg-gray-200/5 bg-gray-200 mb-6 rounded" />
        </div>
      </div>
    </div>
  )
}
