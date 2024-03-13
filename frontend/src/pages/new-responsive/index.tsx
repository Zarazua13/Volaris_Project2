import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  RootState,
  getApproverReset,
  getAssignerReset,
  getDevicesThunk,
  getLocationsThunk,
  getReceiverReset,
  getSettingsThunk,
  postResponsiveReset,
} from "@/store";

import { TitlePage } from "@/components";

import { NewResponsiveForm } from "./components";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { NewResponsiveFormLoading } from "./components/new-responsive-form-loading";

export const NewResponsive = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postResponsiveState = useSelector(
    (state: RootState) => state.newResponsives.postResponsive,
  );
  const getSettingsState = useSelector(
    (state: RootState) => state.settings.getSettings,
  );

  useEffect(() => {
    dispatch(getLocationsThunk());
    dispatch(getDevicesThunk());
    dispatch(getSettingsThunk());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(getAssignerReset());
      dispatch(getApproverReset());
      dispatch(getReceiverReset());
      dispatch(postResponsiveReset());
    };
  }, []);

  useEffect(() => {
    if (postResponsiveState.success && postResponsiveState.data !== null) {
      toast("Se ha creado la responsiva", {
        description: postResponsiveState.data.filename,
        action: {
          label: "Ver",
          onClick: () =>
            navigate(
              `/responsive/${postResponsiveState.data!.filename.replace(".pdf", "")}`,
            ),
        },
      });
    }
  }, [postResponsiveState, navigate]);

  return (
    <div className="space-y-6">
      <TitlePage
        title="Nueva responsivas"
        subtitle="Crea una nueva responsiva para la asignación de un equipo"
      />
      <div className="mx-auto flex-1 pb-10 lg:max-w-2xl">
        {getSettingsState.loading && <NewResponsiveFormLoading />}
        {getSettingsState.success && <NewResponsiveForm />}
      </div>
    </div>
  );
};
