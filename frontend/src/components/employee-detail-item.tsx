import { ReactNode } from "react"

interface Props {
  title: string,
  subtitle: string,
  icon: ReactNode,
}

export const EmployeeDetailItem = ({ icon, title, subtitle }: Props) => {
  return (
    <div className="-mx-2 flex items-center space-x-4 rounded-md p-2">
      {icon}
      <div className="space-y-1">
        <p className="text-sm leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  )
}