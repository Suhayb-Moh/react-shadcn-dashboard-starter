import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import { Button } from '@/components/ui/button';
import ClientCreateForm from '../client-forms/client-create-form';
import { DownloadIcon } from 'lucide-react';

export default function ClientTableActions() {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Clients Here" />
      </div>
      <div className="flex gap-3">
        <Button>
          <DownloadIcon className="h-6 w-6" />
          Download CSV
        </Button>
        <PopupModal
          renderModal={(onClose) => <ClientCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
