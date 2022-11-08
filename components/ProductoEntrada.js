import {
  Group,
  Title,
  Card,
  Badge,
  Button,
  Text,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Image from 'next/image';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons';
import styles from '../styles/ProductoEntrada.module.css';

const ProductoEntrada = ({ producto }) => {
  const [cantidad, setCantidad] = useState(0);
  const { nombre, id, stock, imagen } = producto;

  const form = useForm({
    initialValues: { cantidad: 0 },

    validate: {
      cantidad: (value) =>
        value === 0 ? 'Esta pidiendo 0 de este producto' : null,
    },
  });
  return (
    <div>
      <Card shadow='sm' p='md' radius='md' withBorder>
        <Card.Section>
          <Image
            width={290}
            height={150}
            src={`http://localhost:1337${imagen.url}`}
          />
        </Card.Section>

        <Group position='center' mt='md' mb='xs'>
          <Text weight={500}>{nombre}</Text>
        </Group>

        <form onSubmit={form.onSubmit(console.log)}>
          <Group>
            <NumberInput
              size='xs'
              label='Cantidad'
              {...form.getInputProps('cantidad')}
            />
            <Button
              variant='light'
              color='blue'
              mt='lg'
              radius='md'
              type='submit'
            >
              <IconPlus size={18} />
            </Button>
          </Group>
        </form>
      </Card>
    </div>
  );
};

export default ProductoEntrada;
