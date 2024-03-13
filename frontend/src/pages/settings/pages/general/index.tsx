import { Separator } from "@/components";

import { GeneralForm } from "./general-form";

import { SettingsTitle } from "../../components";

export const GeneralSettingsPage = () => {
  return (
    <div className="space-y-6">
      <SettingsTitle title="General" subtitle="Configura temas relacionados con la plataforma" />
      <Separator />
      <GeneralForm />
    </div>
  )
}