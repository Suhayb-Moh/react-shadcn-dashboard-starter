import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import ClientCreateForm from '../client-forms/client-create-form';

export default function ClientTableActions() {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Clients Here" />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <ClientCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
