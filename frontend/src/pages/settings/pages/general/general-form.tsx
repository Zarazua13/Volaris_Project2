import { Label, Switch, useTheme } from "@/components"

export const GeneralForm = () => {
  const { setTheme, theme } = useTheme()

  const toggleDarkMode = (value: boolean) => {
    setTheme(value ? "dark" : "light")
  }

  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label className="text-base">
          Modo oscuro
        </Label>
        <p className="text-sm text-muted-foreground">
          Activar/Desactivar modo oscuro
        </p>
      </div>
      <Switch onCheckedChange={toggleDarkMode} checked={theme === "dark"} />
    </div>
  )
}
