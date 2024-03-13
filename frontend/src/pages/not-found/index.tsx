import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='h-[100vh] flex justify-center flex-col items-center'>
      <h2 className='mb-5'>404 - Página no encontrada</h2>
      <Button
        onClick={() => {
          navigate('/')
        }}
      >
        <Home className='mr-2' />
        Ir a inicio
      </Button>
    </div>
  )
}
