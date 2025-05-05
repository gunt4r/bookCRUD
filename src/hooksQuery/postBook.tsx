import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/axios/axios';

export default function usePostBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (book: any) => {
      const res = await axios.post('/books', book);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
