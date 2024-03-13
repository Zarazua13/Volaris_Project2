import { useEffect } from "react";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import { RootState, getSettingsThunk, resetSettings } from "@/store";
import { EmployeeDetailsLoading, Separator } from "@/components";

import { SettingsTitle } from "../../components";
import { ResponsivesForm } from "./components/responsives-form";

export const ResponsivesSettingsPage = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state: RootState) => state.settings);

  const postSettingsState = settingsState.postSettings;
  const getSettingsState = settingsState.getSettings;

  useEffect(() => {
    dispatch(getSettingsThunk());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetSettings());
    };
  }, []);

  useEffect(() => {
    if (postSettingsState.success)
      toast.success("Configuración actualizada correctamente!");
    if (postSettingsState.error)
      toast.error("No se pudo obtener la configuración");
  }, [postSettingsState.success]);

  return (
    <div className="space-y-6">
      <SettingsTitle
        title="Responsivas"
        subtitle="Configura temas relacionados con la creación de responsivas"
      />
      <Separator />
      {getSettingsState.loading && (
        <div className="animate-pulse">
          <div className="mb-6">
            <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-4">
              <div className="mb-2 h-8 flex-1 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <EmployeeDetailsLoading />
          <div className="my-6">
            <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mb-6">
            <div className="mb-2 h-6 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="h-10 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      )}
      {getSettingsState.success && <ResponsivesForm />}
    </div>
  );
};
