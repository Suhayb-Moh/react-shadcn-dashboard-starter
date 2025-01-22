import PageHead from '@/components/shared/page-head';
import { useGetClients } from './queries/queries';
import ClientsTable from './components/clients-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function ClientPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetClients(offset, pageLimit, search) as {
    data: { clients: any[]; total_clients: number };
    isLoading: boolean;
  };
  const clients = data;
  const totalClients = data?.total_clients;
  const pageCount = Math.ceil(totalClients / pageLimit);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={5}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Client Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Clients', link: '/clients' }
        ]}
      />
      <ClientsTable
        clients={clients}
        page={page}
        totalClients={totalClients}
        pageCount={pageCount}
      />
    </div>
  );
}
