import { Employee } from "@/interfaces"

export const employeeAdapter = (object: { [key: string]: any }): Employee => {
  const { id, name, email, employeeNumber } = object

  let position = object.position
  let location = object.location
  let boss = object.boss

  if (!position) position = { id: '', name: '' }
  if (!location) location = { id: '', name: '' }
  if (!boss) boss = {
    id: '',
    name: '',
    email: '',
    employeeNumber: '',
    boss: {
      id: '',
      name: '',
      email: '',
      employeeNumber: '',
    },
    position: { id: '', name: '' },
    location: { id: '', name: '' },
  }

  return {
    id,
    name,
    email,
    employeeNumber,
    boss,
    location,
    position
  }
}