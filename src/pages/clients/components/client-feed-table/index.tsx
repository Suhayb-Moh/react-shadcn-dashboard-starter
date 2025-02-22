import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ClientTableActions from './client-table-action';
import { Client } from '@/constants/data';

type TClientsTableProps = {
  clients: Client[];
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function ClientFeedTable({
  clients,
  pageCount
}: TClientsTableProps) {
  return (
    <>
      <ClientTableActions />
      {clients && (
        <DataTable columns={columns} data={clients} pageCount={pageCount} />
      )}
    </>
  );
}
