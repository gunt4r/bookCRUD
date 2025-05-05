import { useState } from 'react';
import {
  Button,
  Container,
  Group,
  Modal,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import CardProduct from '@/components/CardProduct';
import Header from '@/components/Header';
import { bookFormProps, bookProps } from '@/config/interfaces';
import getBooks from '@/hooksQuery/getBooks';
import usePostBook from '@/hooksQuery/postBook';

export function HomePage() {
  const [search, setSearch] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const { isLoading, isError, data } = getBooks();
  const { mutate } = usePostBook();
  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      year: '',
      description: '',
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const filteredData = data.filter((item: bookProps) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const handlePost = (values: bookFormProps) => {
    if (
      values.title === '' ||
      values.author === '' ||
      values.year === '' ||
      values.description === ''
    ) {
      notifications.show({
        title: 'Error',
        color: 'red',
        message: 'Something went wrong. Try again',
      });
      return;
    }
    mutate(values, {
      onSuccess: () => {
        setOpenAddModal(false);
        notifications.show({
          title: `You added book: ${values.title}`,
          color: 'green',
          message: 'Success',
        });
        form.reset();
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Something went wrong',
        });
      },
    });
  };
  return (
    <Container>
      <Modal opened={openAddModal} onClose={() => setOpenAddModal(false)} title="Edit book">
        <TextInput label="Title" {...form.getInputProps('title')} />
        <TextInput label="Author" {...form.getInputProps('author')} />
        <TextInput label="Year" {...form.getInputProps('year')} />
        <Textarea label="Description" {...form.getInputProps('description')} />
        <Button onClick={() => handlePost(form.values)} fullWidth mt="md">
          Save changes
        </Button>
      </Modal>
      <Header search={search} setSearch={setSearch} />
      <Group mb="md" justify="space-between">
        <Text size="lg">Books:</Text>
        <Button onClick={() => setOpenAddModal(true)}>Add a book</Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {filteredData.map((item: bookProps) => (
          <CardProduct key={item.id} book={item} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
