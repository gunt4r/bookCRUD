import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../axios/axios';

export default function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/books/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
