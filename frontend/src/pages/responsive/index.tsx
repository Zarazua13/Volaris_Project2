import { useState } from 'react'

import { Download, Send } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'


import { BACKEND_API_URL } from '@/lib/api'
import { ErrorWarning, Button } from '@/components'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

type FILE_STATES_TYPES = 'LOADING' | 'ERROR' | 'SUCCESS'

export const Responsive = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [fileState, setFileState] = useState<FILE_STATES_TYPES>('LOADING')
  const [pageNumber] = useState<number>(1)

  const onLoadSuccess = () => {
    setFileState('SUCCESS')
  }

  const onLoadError = () => {
    setFileState('ERROR')
  }

  return (
    <div className='pb-10'>
      <Document 
        error={<ErrorWarning onRetry={() => { navigate(0) }} />} 
        loading={<div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-slate-800 mx-auto" />}  
        onLoadSuccess={onLoadSuccess} 
        onLoadError={onLoadError} 
        file={`${BACKEND_API_URL}/responsives/${id}.pdf`} 
        className='w-full [&:first-child]:w-5/6 [&:first-child]:mx-auto'
      >
        <Page pageNumber={pageNumber} height={1200} className="flex justify-center !bg-transparent" />
      </Document>
      
      {fileState === 'SUCCESS' && (
        <div className='flex justify-center mt-5 gap-5'>
          <Button disabled={fileState !== 'SUCCESS'}>
            <Send />
            Envíar
          </Button>
          <Button disabled={fileState !== 'SUCCESS'}>
            <Download />
            Descargar
          </Button>
        </div>
      )}
    </div>
  )
}
