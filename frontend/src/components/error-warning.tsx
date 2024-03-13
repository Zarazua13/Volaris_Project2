import { AlertTriangle } from 'lucide-react'

import { Card, Button } from '.'

interface Props {
  onRetry?: () => void
}

export const ErrorWarning = ({ onRetry }: Props) => {
  return (
    <Card className="w-auto p-4 text-center flex flex-col items-center">
      <AlertTriangle className="w-16 h-16 mb-6" />
      <p className="text-2xl font-bold">Sucedió un error al obtener la información</p>
      {onRetry && <Button onClick={onRetry} className="mt-6">Reintentar</Button>}
    </Card>
  )
}
