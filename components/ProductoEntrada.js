import {
  Group,
  Title,
  Card,
  Badge,
  Button,
  Text,
  NumberInput,
} from "@mantine/core";
import Swal from "sweetalert2";
import { useForm } from "@mantine/form";
import Image from "next/image";
import { useState } from "react";
import { IconPlus } from "@tabler/icons";
import styles from "../styles/ProductoEntrada.module.css";
import { useAuth } from "../context/AuthContext";
import { crearProductoCarrito } from "../helpers";
import axios from "axios";

const ProductoEntrada = ({ producto }) => {
  const { nombre, id, stock, imagen } = producto;
  const {
    guardarProducto,
    productoInfo,
    pro,
    setPro,
    user,
    setMostrarCampana,
  } = useAuth();

  const form = useForm({
    initialValues: { cantidad: 0 },

    validate: {
      cantidad: (value) =>
        value === 0 ? "Esta pidiendo 0 de este producto" : null,
    },
  });

  const { cantidad } = form.values;

  const agregarCarrito = () => {
    const productoTemp = {
      nombre: nombre,
      id_producto: id,
      imagen: imagen,
      cantidad: cantidad,
      usuario_id: user["id"],
    };
    crearProductoCarrito(productoTemp);

    setMostrarCampana(true);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${nombre} agregado al carrito`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Card.Section>
          <Image
            width={290}
            height={150}
            alt={`Icono de ${producto["nombre"]}`}
            src={`/../public/images/${producto["imagen"]}`}
          />
        </Card.Section>

        <Group position="center" mt="md" mb="xs">
          <Text weight={500}>{nombre}</Text>
        </Group>

        <form onSubmit={form.onSubmit(agregarCarrito)}>
          <Group>
            <NumberInput
              size="xs"
              label="Cantidad"
              {...form.getInputProps("cantidad")}
            />
            <Button
              variant="light"
              color="blue"
              mt="lg"
              radius="md"
              type="submit"
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
