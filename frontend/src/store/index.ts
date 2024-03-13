import { configureStore } from "@reduxjs/toolkit"
import { responsivesSlice } from "./responsives"
import { employeesSlice } from "./employees"
import { settingsSlice } from "./settings"
import { devicesSlice } from "./devices"
import { newResponsivesSlice } from "./new-responsive"
import { locationsSlice } from "./locations"
import { uploadFileSlice } from "./upload-file"

export const store = configureStore({
  reducer: {
    responsives: responsivesSlice.reducer,
    employees: employeesSlice.reducer,
    settings: settingsSlice.reducer,
    locations: locationsSlice.reducer,
    devices: devicesSlice.reducer,
    newResponsives: newResponsivesSlice.reducer,
    uploadFile: uploadFileSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export * from './auth/slice';
export * from './devices';
export * from './employees';
export * from './locations';
export * from './new-responsive';
export * from './responsives';
export * from './settings';
