import { Dispatch } from "@reduxjs/toolkit";
import {
  getResponsivesError,
  getResponsivesLoading,
  getResponsivesSuccess,
} from ".";
import { getResponsives } from "@/lib/baas/responsives";

export const getResponsivesThunk: any = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getResponsivesLoading());

      const responsives = await getResponsives();

      dispatch(getResponsivesSuccess(responsives));
    } catch (err) {
      dispatch(getResponsivesError(err));
    }
  };
};
