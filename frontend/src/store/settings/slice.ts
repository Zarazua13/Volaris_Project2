import { Employee, Settings } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface GetSettings {
  loading: boolean;
  success: boolean;
  error: any;
  data: Settings;
}

interface PostSettings {
  loading: boolean;
  success: boolean;
  error: any;
  data: Settings;
}

interface GetDefaultAssigner {
  loading: boolean;
  success: boolean;
  error: any;
  data: Employee;
}

interface InitialState {
  getSettings: GetSettings;
  getDefaultAssigner: GetDefaultAssigner;
  postSettings: PostSettings;
}

const initialState: InitialState = {
  getSettings: {
    loading: false,
    success: false,
    data: {
      referenceNumber: "0",
      defaultAssigner: "",
      defaultComment: "",
    },
    error: null,
  },
  postSettings: {
    loading: false,
    success: false,
    data: {
      referenceNumber: "0",
      defaultAssigner: "",
      defaultComment: "",
    },
    error: null,
  },
  getDefaultAssigner: {
    loading: false,
    success: false,
    data: {
      id: "",
      name: "",
      employeeNumber: "",
      email: "",
      position: {
        id: 0,
        name: "",
      },
      location: {
        id: 0,
        name: "",
      },
      boss: null,
    },
    error: null,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettingsLoading: (state) => {
      state.getSettings = {
        ...initialState.getSettings,
        loading: true,
      };
    },
    getSettingsSuccess: (state, action) => {
      state.getSettings = {
        ...initialState.getSettings,
        loading: false,
        success: true,
        data: action.payload,
      };
    },
    getSettingsError: (state, action) => {
      state.getSettings = {
        ...initialState.getSettings,
        loading: false,
        error: action.payload,
      };
    },
    postSettingsLoading: (state) => {
      state.postSettings = {
        ...initialState.postSettings,
        loading: true,
      };
    },
    postSettingsSuccess: (state, action) => {
      state.postSettings = {
        ...initialState.postSettings,
        loading: false,
        success: true,
        data: action.payload,
      };
    },
    postSettingsError: (state, action) => {
      state.postSettings = {
        ...initialState.postSettings,
        loading: false,
        error: action.payload,
      };
    },
    getDefaultAssignerLoading: (state) => {
      state.getDefaultAssigner = {
        ...initialState.getDefaultAssigner,
        loading: true,
      };
    },
    getDefaultAssignerSuccess: (state, action) => {
      state.getDefaultAssigner = {
        ...initialState.getDefaultAssigner,
        loading: false,
        success: true,
        data: action.payload,
      };
    },
    getDefaultAssignerError: (state, action) => {
      state.getDefaultAssigner = {
        ...initialState.getDefaultAssigner,
        loading: false,
        error: action.payload,
      };
    },
    resetSettings: (state) => {
      state.getDefaultAssigner = initialState.getDefaultAssigner;
      state.getSettings = initialState.getSettings;
      state.postSettings = initialState.postSettings;
    },
  },
});

export const {
  getSettingsLoading,
  getSettingsSuccess,
  getSettingsError,
  postSettingsLoading,
  postSettingsSuccess,
  postSettingsError,
  getDefaultAssignerLoading,
  getDefaultAssignerSuccess,
  getDefaultAssignerError,
  resetSettings,
} = settingsSlice.actions;
