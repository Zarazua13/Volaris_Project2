interface Props {
  title: string,
  subtitle: string,
}

export const SettingsTitle = ({ title, subtitle }: Props) => {
  return (<div>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-sm text-muted-foreground">
      {subtitle}
    </p>
  </div>
  )
}