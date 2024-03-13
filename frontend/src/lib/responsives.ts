import { RegisterOptions } from "react-hook-form"

export interface Form {
  label: string
  name: 'brand' | 'serialNumber' | 'model' | 'description'
  id: string
  htmlFor: string
  placeholder: string
  register: RegisterOptions
}

export const deviceForm: Form[] = [
  {
    label: 'Marca',
    name: 'brand',
    id: 'brand',
    htmlFor: 'brand',
    placeholder: 'HP',
    register: {
      required: true
    }
  },
  {
    label: 'Numero de serie',
    name: 'serialNumber',
    id: 'serialNumber',
    htmlFor: 'serialNumber',
    placeholder: '1234567',
    register: {
      required: true
    }
  },
  {
    label: 'Modelo',
    name: 'model',
    id: 'model',
    htmlFor: 'model',
    placeholder: 'ZBook',
    register: {
      required: true
    }
  },
  {
    label: 'Descripción',
    name: 'description',
    id: 'description',
    htmlFor: 'description',
    placeholder: 'Equipo de trabajo',
    register: {
      required: true
    }
  }
]
