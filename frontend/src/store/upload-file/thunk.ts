import { Dispatch } from "@reduxjs/toolkit";

import { uploadFileSuccess, uploadFileLoading, uploadFileError } from ".";

import { uploadFileRequest } from "@/lib";

export const uploadFileThunk: any = (file: File) => {
  return async (dispatch: Dispatch) => {
    try {

      dispatch(uploadFileLoading());
      
      const { data } = await uploadFileRequest(file);
      
      dispatch(uploadFileSuccess(data));
    } catch (error) {
      dispatch(uploadFileError)
    }
  };
};
