import { useEffect } from 'react'

import { Plus, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'

import { getResponsivesThunk } from '@/store/responsives/thunks'

import { ErrorWarning, TableSkeleton, TitlePage } from '@/components'
import { RootState } from '@/store'
import { DataTableDemo } from './components/table'

export const Responsives = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, loading, success, error } = useSelector((state: RootState) => state.responsives.getResponsives)

  useEffect(() => {
    getResponsives()
  }, [dispatch])

  const getResponsives = () => {
    dispatch(getResponsivesThunk())
  }

  return (
    <div className='w-full'>
      <TitlePage title='Responsivas'>
        <div className='flex gap-2'>
          <Button onClick={() => navigate('/upload-responsives')}>
            <Upload className='mr-2' />Cargar
          </Button>
          <Button onClick={() => navigate('/new-responsive')}>
            <Plus className='mr-2' />
            Nueva responsiva
          </Button>
        </div>
      </TitlePage>


      {loading && <TableSkeleton />}

      {success && <DataTableDemo responsives={data} />}

      {error && <ErrorWarning onRetry={getResponsives} />}

    </div>
  )
}

export default Responsives
