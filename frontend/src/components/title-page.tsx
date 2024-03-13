import { Separator } from "./ui/separator"

interface Props {
  children?: JSX.Element
  title: string,
  subtitle?: string
}

export const TitlePage = ({ children, title, subtitle }: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
      <Separator className="my-6" />
    </>
  )
}
