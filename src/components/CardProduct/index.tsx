import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import { Badge, Button, Card, Group, Modal, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { bookProps } from '@/config/interfaces';
import useDeleteBook from '@/hooksQuery/deleteBook';
import useUpdateBook from '@/hooksQuery/updateBook';

export default function CardProduct({ book }: { book: bookProps }) {
  const { mutate } = useDeleteBook();
  const { mutate: updateBook } = useUpdateBook();
  const [openedDetails, setOpenedDetails] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const form = useForm({
    initialValues: {
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
    },
  });
  function handleDelete() {
    mutate(book.id, {
      onSuccess: () => {
        notifications.show({
          title: `You deleted book: ${book.title}`,
          color: 'green',
          message: 'Success',
        });
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Something went wrong',
        });
      },
    });
  }
  async function handleEdit(book: bookProps) {
    updateBook(book, {
      onSuccess: () => {
        notifications.show({
          title: `You updated book: ${book.title}`,
          color: 'green',
          message: 'Success',
        });
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Something went wrong',
        });
      },
    });
    setOpenedEdit(false);
  }
  return (
    <>
      <Modal opened={openedDetails} onClose={() => setOpenedDetails(false)} title="Book details">
        <Text>
          <strong>Title:</strong> {book.title}
        </Text>
        <Text>
          <strong>Author:</strong> {book.author}
        </Text>
        <Text>
          <strong>Year:</strong> {book.year}
        </Text>
        <Text>
          <strong>Description:</strong> {book.description}
        </Text>
      </Modal>

      <Modal opened={openedEdit} onClose={() => setOpenedEdit(false)} title="Edit book">
        <TextInput label="Title" {...form.getInputProps('title')} />
        <TextInput label="Author" {...form.getInputProps('author')} />
        <TextInput label="Year" {...form.getInputProps('year')} />
        <Textarea label="Description" {...form.getInputProps('description')} />
        <Button onClick={() => handleEdit(form.values)} fullWidth mt="md">
          Save changes
        </Button>
      </Modal>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{book.title}</Text>
          <Badge color="gray">{book.year}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {book.description}
        </Text>

        <Text size="xs" c="dimmed">
          {book.author}
        </Text>

        <Group justify="space-between" bottom="md" mt="md" mb="xs">
          <Button onClick={() => setOpenedDetails(true)} color="blue" mt="md" radius="md">
            Details
          </Button>
          <Group>
            <Button
              variant="subtle"
              onClick={handleDelete}
              color="red"
              mt="md"
              size="xs"
              radius="xl"
            >
              <IoCloseOutline size={20} color="red" />
            </Button>
            <Button
              onClick={() => setOpenedEdit(true)}
              variant="subtle"
              color="dark"
              mt="md"
              size="xs"
              radius="xl"
            >
              <MdModeEditOutline size={20} color="white" />
            </Button>
          </Group>
        </Group>
      </Card>
    </>
  );
}
