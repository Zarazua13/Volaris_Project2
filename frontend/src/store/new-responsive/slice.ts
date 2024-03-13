import { Employee } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface GetEmployee {
  loading: boolean;
  success: boolean;
  data: Employee;
  error: any;
}

interface PostResponsiveResponse {
  filename: string;
}

interface PostResponsive {
  loading: boolean;
  success: boolean;
  error: any;
  data: PostResponsiveResponse | null;
}

interface InitialState {
  getAssigner: GetEmployee;
  getReceiver: GetEmployee;
  getApprover: GetEmployee;
  postResponsive: PostResponsive;
}

const initialState: InitialState = {
  getAssigner: {
    loading: false,
    success: false,
    error: null,
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
      boss: {
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
    },
  },
  getReceiver: {
    loading: false,
    success: false,
    error: null,
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
      boss: {
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
    },
  },
  getApprover: {
    loading: false,
    success: false,
    error: null,
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
      boss: {
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
    },
  },
  postResponsive: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
};

export const newResponsivesSlice = createSlice({
  name: "newResponsive",
  initialState,
  reducers: {
    getReceiverLoading: (state) => {
      state.getReceiver = {
        ...initialState.getReceiver,
        loading: true,
      };
    },
    getReceiverSuccess: (state, action) => {
      state.getReceiver = {
        ...initialState.getReceiver,
        success: true,
        data: action.payload,
      };
    },
    getReceiverError: (state, action) => {
      state.getReceiver = {
        ...initialState.getReceiver,
        error: action.payload,
      };
    },
    getReceiverReset: (state) => {
      state.getReceiver = initialState.getReceiver;
    },
    getApproverLoading: (state) => {
      state.getApprover = {
        ...initialState.getApprover,
        loading: true,
      };
    },
    getApproverSuccess: (state, action) => {
      state.getApprover = {
        ...initialState.getApprover,
        success: true,
        data: action.payload,
      };
    },
    getApproverError: (state, action) => {
      state.getApprover = {
        ...initialState.getApprover,
        error: action.payload,
      };
    },
    getApproverReset: (state) => {
      state.getApprover = initialState.getApprover;
    },
    getAssignerLoading: (state) => {
      state.getAssigner = {
        ...initialState.getAssigner,
        loading: true,
      };
    },
    getAssignerSuccess: (state, action) => {
      state.getAssigner = {
        ...initialState.getAssigner,
        success: true,
        data: action.payload,
      };
    },
    getAssignerError: (state, action) => {
      state.getAssigner = {
        ...initialState.getAssigner,
        error: action.payload,
      };
    },
    getAssignerReset: (state) => {
      state.getAssigner = initialState.getAssigner;
    },
    postResponsiveLoading: (state) => {
      state.postResponsive = {
        ...initialState.postResponsive,
        loading: true,
      };
    },
    postResponsiveSuccess: (state, { payload }) => {
      state.postResponsive = {
        ...initialState.postResponsive,
        success: true,
        data: payload,
      };
    },
    postResponsiveError: (state, { payload }) => {
      state.postResponsive = {
        ...initialState.postResponsive,
        error: payload,
      };
    },
    postResponsiveReset: (state) => {
      state.postResponsive = initialState.postResponsive;
    },
  },
});

export const {
  getApproverError,
  getApproverLoading,
  getApproverReset,
  getApproverSuccess,
  getAssignerError,
  getAssignerLoading,
  getAssignerReset,
  getAssignerSuccess,
  getReceiverError,
  getReceiverLoading,
  getReceiverReset,
  getReceiverSuccess,
  postResponsiveError,
  postResponsiveLoading,
  postResponsiveReset,
  postResponsiveSuccess,
} = newResponsivesSlice.actions;
