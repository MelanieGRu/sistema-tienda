import React from "react";
import Layout from "../components/Layout";
import Pedido from "../components/Pedido";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Pedidos.module.css";

const Pedidos = ({ datos }) => {
  const { user } = useAuth();
  if (user !== null) {
    datos = datos.filter((dato) => dato["usuario_id"] == user["id"]);
  }

  console.log(datos);

  if (datos.length == 0) {
    return (
      <Layout>
        <h1 className={styles.titulo}>No Existen Pedidos</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      {!datos
        ? null
        : datos.map((dato) => <Pedido datos={dato} key={dato["id"]} />)}
    </Layout>
  );
};

export default Pedidos;
export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/pedidos");
  const pedidos = await res.json();

  let datos = [];

  for (const pedido of pedidos) {
    const resUsuario = await fetch(
      "http://localhost:1337/usuarios/" + pedido["usuario_id"]
    );
    const usuario = await resUsuario.json();

    const resPedidoLineas = await fetch("http://localhost:1337/pedido-lineas");
    const pedidoLineas = await resPedidoLineas.json();

    let lineas = [];
    for (const linea of pedidoLineas) {
      if (pedido["id"] == linea["pedido_id"]) {
        lineas.push(linea);
      }
    }

    let productos = {};
    const resProductos = await fetch("http://localhost:1337/productos");
    const productosRegresados = await resProductos.json();

    for (const producto of productosRegresados) {
      productos[`${producto["id"]}`] = producto["nombre"];
    }

    datos.push({
      id: pedido["id"],
      fecha: pedido["published_at"],
      nombre: usuario["nombre"],
      usuario_id: usuario["id"],
      correo: usuario["correo"],
      telefono: usuario["telefono"],
      perfil: usuario["perfil"],
      estado: pedido["estado"],
      lineas: lineas,
      comentario: pedido["comentario"],
      productos: productos,
      respuesta: pedido["respuesta"],
      titulo: pedido["titulo"],
    });
  }

  datos = datos.reverse();

  return {
    props: {
      datos,
    },
  };
}
