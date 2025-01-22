import { Checkbox } from '@radix-ui/react-checkbox';
import { Client } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { ClientAction } from './cell-action';

export const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    accessorKey: 'address',
    header: 'ADDRESS'
  },
  {
    accessorKey: 'city',
    header: 'CITY'
  },
  {
    id: 'actions',
    cell: ({ row }) => <ClientAction data={row.original} />
  }
];
