import { RootState, getReceiverThunk } from "@/store";

import { EmployeeDetails, SearchEmployeeForm } from ".";
import { useSelector } from "react-redux";
import { EmployeeDetailsLoading } from "@/components";

export const SearchReceiver = () => {
  const { data, loading, success } = useSelector(
    (state: RootState) => state.newResponsives.getReceiver,
  );

  return (
    <div>
      <SearchEmployeeForm
        thunk={getReceiverThunk}
        description="Número de empleado de quien recibe"
        label="Recibe"
      />
      {loading && <EmployeeDetailsLoading />}
      {success && <EmployeeDetails employee={data} />}
    </div>
  );
};
