import { useState } from 'react'

import * as ReactTable from '@tanstack/react-table'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input
} from '@/components'
import { Device } from '@/interfaces/devices'

const columnHelper = ReactTable.createColumnHelper<Device>()

export const columns = [
  columnHelper.accessor('name', {
    header: 'Dispositivo',
    cell: ({ row }) =>row.getValue('name')
  }),
  columnHelper.accessor('code', {
    header: 'Abreviación',
    cell: ({ row }) => <div>{row.getValue('code')}</div>
  }),
]

interface Props {
  devices: Device[]
}

export function TableDevices({ devices }: Props) {
  const [sorting, setSorting] = useState<ReactTable.SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ReactTable.ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<ReactTable.VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = ReactTable.useReactTable({
    data: devices,
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
          placeholder='Filtrar dispositivos...'
          name='search-device'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
          data-np-autofill-field-type="none"
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
