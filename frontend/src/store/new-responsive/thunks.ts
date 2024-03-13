import { Dispatch } from "@reduxjs/toolkit";

import {
  getApproverError,
  getApproverLoading,
  getApproverSuccess,
  getAssignerError,
  getAssignerLoading,
  getAssignerSuccess,
  getReceiverError,
  getReceiverLoading,
  getReceiverSuccess,
  postResponsiveError,
  postResponsiveLoading,
  postResponsiveSuccess,
} from ".";

import { getEmployee } from "@/lib/baas/employees";
import { postResponsive } from "@/lib";

export const getAssignerThunk: any = (employeeNumber: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getAssignerLoading());

      const employee = await getEmployee(employeeNumber);

      dispatch(getAssignerSuccess(employee));
    } catch (err) {
      dispatch(getAssignerError(err));
    }
  };
};

export const getReceiverThunk: any = (employeeNumber: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getReceiverLoading());

      const employee = await getEmployee(employeeNumber);

      dispatch(getReceiverSuccess(employee));
    } catch (err) {
      dispatch(getReceiverError(err));
    }
  };
};

export const getApproverThunk: any = (employeeNumber: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getApproverLoading());

      const employee = await getEmployee(employeeNumber);

      dispatch(getApproverSuccess(employee));
    } catch (err) {
      dispatch(getApproverError(err));
    }
  };
};

export const postResponsiveThunk: any = (data: { [key: string]: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(postResponsiveLoading());

      const response = await postResponsive(data);

      dispatch(postResponsiveSuccess(response));
    } catch (err) {
      dispatch(postResponsiveError(err));
    }
  };
};
