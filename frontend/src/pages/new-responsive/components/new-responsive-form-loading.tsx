import { EmployeeDetailsLoading } from "@/components";

export const NewResponsiveFormLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-8 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex gap-2">
        <div className="mb-2 h-4 w-4 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-4 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="my-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2">
          <div className="mb-2 h-8 flex-1 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="my-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2">
          <div className="mb-2 h-8 flex-1 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <EmployeeDetailsLoading />
      <div className="my-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-8 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mb-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mb-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mb-6">
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-10 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};
