import { Sun, Moon } from "lucide-react"

import { Theme, useTheme } from "./theme-provider"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, Label } from "./ui"

export const SelectTheme = () => {
  const { setTheme, theme } = useTheme()

  const handleChange = (event: Theme) => {
    setTheme(event)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">

          <div>
            <CardTitle>Aspecto</CardTitle>
            <CardDescription>
              Selecciona el aspecto
            </CardDescription>
          </div>
          <RadioGroup defaultValue={theme} onValueChange={handleChange} className="flex ml-auto">
            <div>
              <RadioGroupItem
                value="light"
                id="light"
                className="peer sr-only"
              />
              <Label
                htmlFor="light"
                className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
              <Sun className="mr-1 h-5 w-6" />
              <span >Claro</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Moon className="mr-1 h-5 w-6" />
                <span >Oscuro</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

      </CardHeader>
    </Card>
  )
}