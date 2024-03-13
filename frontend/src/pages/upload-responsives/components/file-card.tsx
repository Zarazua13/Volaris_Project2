import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger } from "@/components"
import { ChevronDownIcon } from "lucide-react"

interface Props {
  name: string,
  size: number,
  clearFile: () => void,
  sendFile: () => void,
}

export const FileCard = ({ name, clearFile, sendFile }: Props) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Archivo</CardTitle>
        <CardDescription>
          {name}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 justify-end">
        <Button onClick={clearFile} variant="ghost" className="">Cancelar</Button>
        <Button onClick={sendFile} variant="secondary">Envíar</Button>
      </CardContent>
    </Card>
  )
}
