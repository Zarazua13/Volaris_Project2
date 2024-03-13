import { Dispatch } from "@reduxjs/toolkit";

import {
  getSettingsSuccess,
  getSettingsLoading,
  getSettingsError,
  getDefaultAssignerSuccess,
  getDefaultAssignerLoading,
  getDefaultAssignerError,
  postSettingsLoading,
  postSettingsSuccess,
  postSettingsError,
} from ".";

import { getSettingsRequest, postSettingsRequest } from "@/lib/baas/settings";
import { Settings } from "@/interfaces";

import { settingsAdapter } from "@/adapters/settings";
import { getEmployee } from "@/lib";

export const getSettingsThunk: any = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getSettingsLoading());

      const settings = await getSettingsRequest();

      dispatch(getSettingsSuccess(settingsAdapter(settings)));
    } catch (err) {
      dispatch(getSettingsError(err));
    }
  };
};

export const getDefaultAssignerThunk: any = (employeeNumber: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getDefaultAssignerLoading());

      const employee = await getEmployee(employeeNumber);

      dispatch(getDefaultAssignerSuccess(employee));
    } catch (err) {
      dispatch(getDefaultAssignerError(err));
    }
  };
};

export const postSettingsThunk: any = (settings: Settings) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(postSettingsLoading());

      const response = await postSettingsRequest(settings);

      dispatch(postSettingsSuccess(response));
    } catch (err) {
      dispatch(postSettingsError(err));
    }
  };
};
