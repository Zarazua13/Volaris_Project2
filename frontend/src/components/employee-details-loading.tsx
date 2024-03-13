import { Card } from "@/components";

export const EmployeeDetailsLoading = () => {
  return (
    <div className="mt-8 lg:w-1/2">
      <Card className="min-h-[325px] animate-pulse p-6">
        <div className="mb-2 h-4 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="mb-4 h-2.5 w-56 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="mb-6 flex items-center gap-2">
          <div>
            <div className=" h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <div>
            <div className=" h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <div>
            <div className=" h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <div>
            <div className=" h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </Card>
    </div>
  );
};
