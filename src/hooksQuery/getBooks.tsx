import { useQuery } from '@tanstack/react-query';
import axios from '../axios/axios'
export default function getBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axios.get('/books');
        return res.data;
    },
  });
}
