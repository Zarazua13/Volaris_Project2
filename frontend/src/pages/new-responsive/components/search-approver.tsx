import { RootState, getApproverThunk } from "@/store";

import { EmployeeDetails, SearchEmployeeForm } from ".";
import { useSelector } from "react-redux";
import { EmployeeDetailsLoading } from "@/components";

export const SearchApprover = () => {
  const { data, loading, success } = useSelector(
    (state: RootState) => state.newResponsives.getApprover,
  );

  return (
    <div>
      <SearchEmployeeForm
        thunk={getApproverThunk}
        description="Número de empleado de quien debe aprobar"
        label="Aprueba"
      />
      {loading && <EmployeeDetailsLoading />}
      {success && <EmployeeDetails employee={data} />}
    </div>
  );
};
