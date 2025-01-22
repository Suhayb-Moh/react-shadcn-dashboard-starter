import { useMutation, useQuery } from '@tanstack/react-query';
import { getApiData } from '@/lib/api';
import { postApiData } from '@/lib/api';
import { updateApiData } from '@/lib/api';

export const useGetClients = (
  offset: number,
  pageLimit: number,
  search: string
) => {
  return useQuery({
    queryKey: ['clients', offset, pageLimit, search],
    queryFn: async () => {
      const data = await getApiData('clients', { offset, pageLimit, search });
      return data;
    }
  });
};

export const useCreateClient = () => {
  return useMutation({
    mutationFn: async (clientData: Record<string, unknown>) => {
      const response = await postApiData('clients', clientData);
      console.log(
        'this is the client data from the backend after POST: ',
        response
      );
      return response;
    }
  });
};

export const useUpdateClient = () => {
  return useMutation({
    mutationFn: async ({
      clientId,
      clientData
    }: {
      clientId: string;
      clientData: Record<string, unknown>;
    }) => {
      const response = await updateApiData(`clients/${clientId}`, clientData);
      console.log(
        'this is the client data from the backend after PUT: ',
        response
      );
      return response;
    }
  });
};
