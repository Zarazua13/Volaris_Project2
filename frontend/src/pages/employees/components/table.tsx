import { useState } from 'react'
import * as ReactTable from '@tanstack/react-table'

import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components'

import { Employee } from '@/interfaces/employee'

const columnHelper = ReactTable.createColumnHelper<Employee>()

export const columns = [
  columnHelper.accessor('name', {
    header: 'Empleado',
    cell: ({ row }) => row.getValue('name')
  }),
  columnHelper.accessor('employeeNumber', {
    header: 'Número de empleado',
    cell: ({ row }) => <div>{row.getValue('employeeNumber')}</div>
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  }),
  columnHelper.accessor('location.name', {
    header: 'Ubicación',
    cell: info => <div>{info.getValue()}</div>
  }),
]

interface Props {
  employees: Employee[]
}

export function TableEmployees({ employees }: Props) {
  const [sorting, setSorting] = useState<ReactTable.SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ReactTable.ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<ReactTable.VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = ReactTable.useReactTable({
    data: employees,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: ReactTable.getCoreRowModel(),
    getPaginationRowModel: ReactTable.getPaginationRowModel(),
    getSortedRowModel: ReactTable.getSortedRowModel(),
    getFilteredRowModel: ReactTable.getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filtrar empleados...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : ReactTable.flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  responsives-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {ReactTable.flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
