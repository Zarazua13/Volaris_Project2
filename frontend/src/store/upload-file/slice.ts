import { createSlice } from "@reduxjs/toolkit";

interface UploadFile {
  loading: boolean;
  success: boolean;
  error: any;
  data: {
    message: string;
  };
}

interface InitialState {
  uploadFile: UploadFile;
}

const initialState: InitialState = {
  uploadFile: {
    loading: false,
    success: false,
    data: {
      message: "",
    },
    error: null,
  },
};

export const uploadFileSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    uploadFileLoading: (state) => {
      state.uploadFile = { ...initialState.uploadFile, loading: true }
    },
    uploadFileSuccess: (state, action) => {
      state.uploadFile = { ...initialState.uploadFile, success: true, data: action.payload }
    },
    uploadFileError: (state, action) => {
      state.uploadFile = { ...initialState.uploadFile, error: action.payload }
    },
  },
});

export const { uploadFileLoading, uploadFileSuccess, uploadFileError } = uploadFileSlice.actions;
