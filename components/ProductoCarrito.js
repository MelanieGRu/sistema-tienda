import { Button, Group, NumberInput, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons';
import styles from '../styles/ProductoCarrito.module.css';
import { useState } from 'react';
import { eliminarProductoCarrito, modificarProductoCarrito } from '../helpers';
const ProductoCarrito = ({ producto }) => {
  const form = useForm({
    initialValues: { cantidad: producto.cantidad },

    validate: {
      cantidad: (value) =>
        value === 0 ? 'Esta pidiendo 0 de este producto' : null,
    },
  });

  let { cantidad } = form.values;

  const menosCantidad = () => {
    cantidad--;
    form.values['cantidad'] = cantidad;
    const datos = {
      cantidad: cantidad,
    };
    modificarProductoCarrito(producto.id, datos);
  };

  const masCantidad = () => {
    cantidad++;
    form.values['cantidad'] = cantidad;
    const datos = {
      cantidad: cantidad,
    };
    modificarProductoCarrito(producto.id, datos);
  };

  const eliminarProducto = () => {
    eliminarProductoCarrito(producto.id);
  };

  const submit = () => {};
  return (
    <div className={styles.contenedorProducto}>
      <Group position='center' align='center' className={styles.productoLogo}>
        <Image
          width={50}
          height={50}
          alt={`Icono de ${producto['nombre']}`}
          src={`/../public/images/${producto['imagen']}`}
        />
        <Text>{producto.nombre}</Text>
      </Group>
      <Group p={8} position='center' align='center'>
        <form onSubmit={form.onSubmit(submit)} className={styles.formulario}>
          <Group>
            <Button mt='xs' radius='md' type='submit' onClick={menosCantidad}>
              <IconMinus size={18} />
            </Button>
            <NumberInput
              size='xs'
              hideControls
              readOnly
              {...form.getInputProps('cantidad')}
            />
            <Button mt='xs' radius='md' type='submit' onClick={masCantidad}>
              <IconPlus size={18} />
            </Button>
            <Button
              mt='xs'
              radius='md'
              type='submit'
              onClick={eliminarProducto}
            >
              <IconTrash size={18} />
            </Button>
          </Group>
        </form>
      </Group>
    </div>
  );
};

export default ProductoCarrito;
