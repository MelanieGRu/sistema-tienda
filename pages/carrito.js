import { Button, Group, Textarea, Title } from "@mantine/core";
import Layout from "../components/Layout";
import ProductoCarrito from "../components/ProductoCarrito";
import { useAuth } from "../context/AuthContext";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

import styles from "../styles/Carrito.module.css";
import { useState } from "react";

const Carrito = ({ productos }) => {
  const { user } = useAuth();
  const [mostrarError, setMostrarError] = useState("");

  if (user) {
    productos = productos.filter(
      (producto) => producto["usuario_id"] == user["id"]
    );
  }

  const form = useForm({
    initialValues: { comentario: "" },
  });

  const enviarCarrito = async () => {
    setMostrarError("");

    const res = await fetch("http://localhost:1337/carritos");
    const resProd = await res.json();
    productos = resProd.filter(
      (producto) => producto["usuario_id"] == user["id"]
    );

    if (productos.length < 1) {
      setMostrarError("Error! El carrito esta vacío");
      return;
    }

    productos.map(async (producto) => {
      const res = await fetch(
        "http://localhost:1337/productos/" + producto["id_producto"]
      );
      const resProductos = await res.json();
      const productoStock = resProductos["stock"];
      if (productoStock - producto["cantidad"] < 0) {
        setMostrarError(
          `No hay suficiente stock para ${producto["cantidad"]} ${producto["nombre"]}`
        );
      }
    });

    const datos = {
      usuario_id: user["id"],
      comentario: form.values["comentario"],
      estado: "espera",
    };

    let id_pedido;

    axios.post("http://localhost:1337/pedidos", datos).then((response) => {
      id_pedido = response["data"].id;
    });

    if (mostrarError == "") {
      productos.map(async (producto) => {
        const res = await fetch(
          "http://localhost:1337/productos/" + producto["id_producto"]
        );
        const resProductos = await res.json();
        const productoStock = resProductos["stock"];

        const nuevosDatos = {
          stock: productoStock - producto["cantidad"],
        };

        axios
          .put(
            `http://localhost:1337/productos/${producto["id_producto"]}`,
            nuevosDatos
          )
          .then((response) => {
            console.log("Actualizado");
          });

        const pedido_linea = {
          cantidad: producto["cantidad"],
          pedido_id: id_pedido,
          producto_id: producto["id_producto"],
        };

        axios
          .post("http://localhost:1337/pedido-lineas/", pedido_linea)
          .then((response) => {});
      });
    }
  };

  return (
    <div>
      <Layout>
        <div className={styles.main}>
          <Title align="center">Articulos en tu carrito</Title>
          <div>
            {productos.map((producto, index) => (
              <ProductoCarrito key={producto.id} producto={producto} />
            ))}
          </div>

          <form onSubmit={form.onSubmit(enviarCarrito)}>
            <Group className={styles.campos}>
              <Textarea
                autosize
                placeholder="Agregue un comentario (opcional)"
                minRows={2}
                className={styles.textarea}
                {...form.getInputProps("comentario")}
              />
              <Button type="submit" mt="sm">
                Enviar Pedido
              </Button>
            </Group>
          </form>

          {mostrarError == "" ? null : (
            <Notification icon={<IconX size={18} />} color="red">
              {mostrarError}
            </Notification>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Carrito;

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/carritos");
  const productos = await res.json();

  return {
    props: {
      productos,
    },
  };
}
